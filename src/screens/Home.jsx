import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Clothes from "../components/Clothes";
import Searchbar from "../components/Searchbar";
import "./Home.css";

const Home = (props) => {
  const { totalItems, setTotalItems, getNumberProduct, opinions } = props;
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
        <Navbar
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          getNumberProduct={getNumberProduct}
        />
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
        <Footer opinions={opinions} />
      </>
    )
  );
};
export default Home;
