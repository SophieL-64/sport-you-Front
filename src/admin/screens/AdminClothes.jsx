import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClothesAll from "../components/AdminClothesAll";
// import { Link } from "react-router-dom";
// import "./AdminClothes.css";

const Clothes = () => {
  const [clothes, setClothes] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/clothes/clothesAdmin").then((res) => {
      console.log(res.data) || setClothes(res.data);
    });
  }, []);

  return (
    <>
      {console.log("clothes in Good", clothes)}
      <h1 className="adminTitle">Gestion des articles</h1>
      <ClothesAll clothes={clothes} />
    </>
  );
};

export default Clothes;
