import { useState, useEffect } from "react";
import axios from "axios";
import BrandsAll from "../components/AdminBrandsAll";
import { Link } from "react-router-dom";

const Brands = () => {
  const [brands, setBrands] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/brands/brandsAdmin").then((res) => {
      console.log(res.data) || setBrands(res.data);
    });
  }, [refresh]);

  return (
    <>
      {console.log("brands", brands)}
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des couleurs</h1>
      <BrandsAll brands={brands} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Brands;
