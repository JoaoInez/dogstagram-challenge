import { Dog } from "api/types";
import styles from "./CardContent.module.scss";

type Props = {
  dog: Dog | undefined;
};

const CardContent = ({ dog }: Props) => (
  <div className={styles.content}>
    <div className={styles.imageContainer}>
      <img src={dog?.url} alt="" className={styles.image} />
    </div>
    {dog?.breeds?.map((breed) => (
      <div className={styles.info}>
        {breed.name && (
          <>
            <p>
              <b>Breed Name</b>
            </p>
            <p>{breed.name}</p>
          </>
        )}
        {breed.life_span && (
          <>
            <p>
              <b>Life Span</b>
            </p>
            <p>{breed.life_span}</p>
          </>
        )}
        {breed.name && (
          <>
            <p>
              <b>Height (cm)</b>
            </p>
            <p>{breed.height.metric}</p>
          </>
        )}
        {breed.name && (
          <>
            <p>
              <b>Weight (kg)</b>
            </p>
            <p>{breed.weight.metric}</p>
          </>
        )}
        {breed.temperament && (
          <>
            <p>
              <b>Temperament</b>
            </p>
            <p>{breed.temperament}</p>
          </>
        )}
      </div>
    ))}
  </div>
);

export default CardContent;
