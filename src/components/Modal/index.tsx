import Dialog from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Dog } from "api/types";
import CardContent from "components/CardContent";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Modal.module.scss";

type LocationState = {
  dog: Dog;
};

const Modal = () => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const navigate = useNavigate();

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={() => navigate(-1)}
      className={styles.dialog}
    >
      <CardContent dog={state?.dog} />
    </Dialog>
  );
};

export default Modal;
