import { useEffect, useState } from "react";
import axios from "axios";
import Clothes from "../components/Clothes";
import Searchbar from "../components/Searchbar";
import "./Home.css";

const Home = () => {
  const [clothes, setClothes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [clothesSearched, setClothesSearched] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/clothes").then((res) => {
      setClothes(res.data);
      setClothesSearched(res.data);
    });
  }, []);

  return (
    clothes.length && (
      <>
        <Searchbar
          clothes={clothes}
          clothesSearched={clothesSearched}
          setClothesSearched={setClothesSearched}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Clothes clothes={clothesSearched} />
      </>
    )
  );
};
export default Home;
