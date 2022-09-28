import { useState, useEffect } from "react";
import axios from "axios";
import SizesAll from "../components/AdminSizesAll";
import { Link } from "react-router-dom";

const Sizes = () => {
  const [sizes, setSizes] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/sizes/sizesAdmin").then((res) => {
      console.log(res.data) || setSizes(res.data);
    });
  }, [refresh]);

  return (
    <>
      {console.log("sizes", sizes)}
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des tailles</h1>
      <SizesAll sizes={sizes} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Sizes;
