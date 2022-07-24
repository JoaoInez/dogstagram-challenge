import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "api/queries";
import { Dog } from "api/types";
import Gallery from "components/Gallery";
import styles from "./Favorites.module.scss";

const Favorites = () => {
  const favoriteDogsQuery = useQuery(["favoriteDogs"], getFavorites);

  return (
    <section className={styles.container}>
      <Gallery
        data={favoriteDogsQuery.data?.map(
          (favoriteDog): Dog => ({
            id: `${favoriteDog.image_id}`,
            breeds: [],
            url: favoriteDog.image.url,
            height: 0,
            width: 0,
          })
        )}
        isLoading={favoriteDogsQuery.isLoading}
      />
    </section>
  );
};

export default Favorites;
