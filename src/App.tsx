import Layout from "components/Layout";
import Modal from "components/Modal";
import DogPage from "pages/DogPage";
import Favorites from "pages/Favorites";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import { Route, Routes, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation ?? location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/d/:id" element={<DogPage />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/d/:id" element={<Modal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
