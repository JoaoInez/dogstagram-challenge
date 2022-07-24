import { useQuery } from "@tanstack/react-query";
import { getDog } from "api/queries";
import CardContent from "components/CardContent";
import { useParams } from "react-router-dom";
import styles from "./DogPage.module.scss";

const DogPage = () => {
  const { id } = useParams<"id">();
  const dogQuery = useQuery(["dogs", id], () => getDog(id));

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <CardContent dog={dogQuery.data} />
      </div>
    </section>
  );
};

export default DogPage;
