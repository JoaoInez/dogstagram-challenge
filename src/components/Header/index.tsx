import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <Link to="/" className={styles.link}>
          <h1>Dogstagram</h1>
        </Link>
        <Link to="/favorites" className={styles.link}>
          Favorites
        </Link>
      </nav>
    </header>
  );
};

export default Header;
