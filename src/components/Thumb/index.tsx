import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite, postFavorite } from "api/mutations";
import { Dog, FavoriteDog } from "api/types";
import { useMemo } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import styles from "./Thumb.module.scss";

type Props = {
  dog?: Dog;
  favoriteDogs?: FavoriteDog[];
};

const Thumb = ({ dog, favoriteDogs }: Props) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const postFavoriteMutation = useMutation(postFavorite, {
    onMutate: async ({ imageId }) => {
      await queryClient.cancelQueries(["favoriteDogs"]);

      const previousFavoriteDogs = queryClient.getQueryData<FavoriteDog[]>([
        "favorites",
      ]);
      const newFavoriteDog = {
        created_at: "",
        id: -1,
        image: {
          id: imageId,
          url: "",
        },
        image_id: imageId,
        sub_id: "",
        user_id: "",
      };

      queryClient.setQueryData<FavoriteDog[]>(["favoriteDogs"], (previous) =>
        previous ? [...previous, newFavoriteDog] : [newFavoriteDog]
      );

      return { previousFavoriteDogs };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["favoriteDogs"], context?.previousFavoriteDogs);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["favoriteDogs"]);
    },
  });
  const deleteFavoriteMutation = useMutation(deleteFavorite, {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["favoriteDogs"]);

      const previousFavoriteDogs = queryClient.getQueryData<FavoriteDog[]>([
        "favorites",
      ]);

      queryClient.setQueryData<FavoriteDog[]>(["favoriteDogs"], (previous) =>
        previous
          ? previous.filter(
              (previousFavoriteDog) => previousFavoriteDog.id !== id
            )
          : []
      );

      return { previousFavoriteDogs };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["favoriteDogs"], context?.previousFavoriteDogs);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(["favoriteDogs"]);
    },
  });
  const favoriteDog = useMemo(
    () =>
      dog && favoriteDogs?.length
        ? favoriteDogs[
            favoriteDogs.findIndex(({ image_id }) => image_id === dog.id)
          ]
        : null,
    [dog, favoriteDogs]
  );

  return (
    <div className={styles.thumb}>
      {dog ? (
        <>
          <Link
            key={dog.id}
            to={`/d/${dog.id}`}
            state={{ backgroundLocation: location, dog }}
          >
            <img src={dog.url} alt="" className={styles.image} />
          </Link>
          <button
            type="button"
            onClick={() =>
              favoriteDog
                ? deleteFavoriteMutation.mutate(favoriteDog.id)
                : postFavoriteMutation.mutate({ imageId: dog.id })
            }
            className={styles.favorite}
          >
            <BsFillHeartFill
              size="80px"
              color={favoriteDog ? "#f72585" : "#ffffff"}
            />
          </button>
          <div className={styles.overlay} />
        </>
      ) : null}
    </div>
  );
};

export default Thumb;
