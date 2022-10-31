import { useEffect, useState } from "react";
import NoResult from "./NoResult";
import { BsSearch } from "react-icons/bs";
import "./Searchbar.css";

const Searchbar = (props) => {
  const { clothes, setClothesSearched, searchInput, setSearchInput } = props;

  const searchlaunching = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const filteredClothes = clothes.filter(
      (clothe) =>
        (searchInput !== "" &&
          clothe.name.toLowerCase().includes(searchInput.toLowerCase())) ||
        clothe.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        clothe.brand.toLowerCase().includes(searchInput.toLowerCase())
    );

    setClothesSearched(filteredClothes);
  }, [searchInput]);

  return (
    <>
      <div className="searchBar">
        <BsSearch className="actionIcon" />
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
    </>
  );
};

export default Searchbar;
