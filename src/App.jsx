import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import styles from "./App.module.scss";
import { useState } from "react";
import Admin from "./pages/Admin/Admin.jsx";

function App() {
  const [page, setPage] = useState("homepage");
  return (
    <>
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <Header setPage={setPage} />
        {page === "homepage" && <Homepage />}
        {page === "admin" && <Admin />}
        <Footer />
      </div>
    </>
  );
}

export default App;
