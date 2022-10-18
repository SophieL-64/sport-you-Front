import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClothesAll from "../components/AdminClothesAll";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./AdminClothes.css";

const Clothes = () => {
  const [clothes, setClothes] = useState();
  const [refresh, setRefresh] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    axios
      .get("http://localhost:5000/clothes/clothesAdmin", {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log(res.data) || setClothes(res.data);
      });
  }, [refresh]);

  return (
    <>
      {console.log("clothes in Good", clothes)}
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des articles</h1>
      <ClothesAll clothes={clothes} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Clothes;
