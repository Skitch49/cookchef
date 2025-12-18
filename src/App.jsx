import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import styles from "./App.module.scss";


function App() {
  return (
    <>
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <Header />
        <Homepage />
        <Footer />
      </div>
    </>
  );
}

export default App;
