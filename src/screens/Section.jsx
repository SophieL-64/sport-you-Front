import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Clothes from "../components/Clothes";
import axios from "axios";
import "./Section.css";
import Searchbar from "../components/Searchbar";

const Section = (props) => {
  const { totalItems, setTotalItems, getNumberProduct } = props;
  let params = useParams();
  let { id } = params;

  const [clothes, setClothes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [clothesSearched, setClothesSearched] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/sections/${id}`).then((res) => {
      setClothes(res.data);
      setClothesSearched(res.data);
    });
  }, []);

  return (
    <>
      <Searchbar
        clothes={clothes}
        clothesSearched={clothesSearched}
        setClothesSearched={setClothesSearched}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Clothes
        clothes={clothesSearched}
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        getNumberProduct={getNumberProduct}
      />
    </>
  );
};

export default Section;
