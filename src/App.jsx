import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import styles from "./App.module.scss";
import { Outlet } from "react-router";
import { Suspense } from "react";

function App() {
  return (
    <>
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <Header />
        <div className="d-flex flex-column flex-fill">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
