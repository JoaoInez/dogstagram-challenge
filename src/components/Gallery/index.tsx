import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "api/queries";
import { Dog } from "api/types";
import Thumb from "components/Thumb";
import { nanoid } from "nanoid";
import styles from "./Gallery.module.scss";

type Props = {
  data: Dog[] | undefined;
  isLoading: boolean;
};

const Gallery = ({ data, isLoading }: Props) => {
  const favoriteDogsQuery = useQuery(["favoriteDogs"], getFavorites);

  if (isLoading)
    return (
      <div className={styles.grid}>
        {[...Array(6)].map(() => (
          <Thumb key={nanoid()} />
        ))}
      </div>
    );

  return (
    <div className={styles.grid}>
      {data?.length ? (
        data?.map((dog) => (
          <Thumb key={dog.id} dog={dog} favoriteDogs={favoriteDogsQuery.data} />
        ))
      ) : (
        <h1>Nothing to show here</h1>
      )}
    </div>
  );
};

export default Gallery;
