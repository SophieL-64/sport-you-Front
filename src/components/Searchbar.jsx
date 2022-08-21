import { useEffect, useState } from "react";
import Clothes from "./Clothes";
import NoResult from "./NoResult";
import "./Searchbar.css";

const Searchbar = (props) => {
  const { clothes } = props;
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const searchlaunching = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const filterResult =
      searchInput !== ""
        ? clothes.filter(
            (clothe) =>
              clothe.name.toLowerCase().includes(searchInput.toLowerCase()) ||
              clothe.description
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              clothe.brand.toLowerCase().includes(searchInput.toLowerCase())
          )
        : [];
    setResult(
      filterResult.length
        ? filterResult
        : searchInput !== ""
        ? setNoResult(true)
        : clothes
    );
  }, [clothes, searchInput]);

  return (
    <>
      <div className="searchBar">
        <label htmlFor="search">Recherche par mots-clés</label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="tapez mots-clés ici"
          value={searchInput}
          onChange={searchlaunching}
          className="searchInput"
        />
      </div>
      {noResult ? <NoResult /> : <Clothes result={result} />}
    </>
  );
};

export default Searchbar;
