import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClothesAll from "../components/AdminClothesAll";
// import { Link } from "react-router-dom";
// import "./AdminClothes.css";

const Clothes = () => {
  const [clothes, setClothes] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/clothes/clothesAdmin").then((res) => {
      console.log(res.data) || setClothes(res.data);
    });
  }, [refresh]);

  return (
    <>
      {console.log("clothes in Good", clothes)}
      <h1 className="adminTitle">Gestion des articles</h1>
      <ClothesAll clothes={clothes} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Clothes;
