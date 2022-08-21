import { useEffect, useState } from "react";
import axios from "axios";
import Clothes from "../components/Clothes";
import Searchbar from "../components/Searchbar";
import "./Home.css";

const Home = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/clothes")
      .then((res) => setClothes(res.data));
  }, []);
  return (
    <>
      <div className="search">{clothes && <Searchbar clothes={clothes} />}</div>
    </>
  );
};
export default Home;
