import styles from "./Search.module.scss";

function Search({ setSearchBar }) {
  function handleSearchBar(event) {
    const searchBar = event.target.value;
    setSearchBar(searchBar.trim().toLowerCase());
  }

  return (
    <div
      className={`d-flex flex-row align-items-center my-30 ${styles.searchBar}`}
    >
      <i className="fa-solid fa-magnifying-glass mr-15"></i>
      <input
        onInput={handleSearchBar}
        type="text"
        placeholder="Rechercher"
        className={styles.inputSearchBar}
      />
    </div>
  );
}
export default Search;
