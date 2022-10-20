import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import SizesAll from "../components/AdminSizesAll";
import { Link } from "react-router-dom";

const Sizes = () => {
  const [sizes, setSizes] = useState();
  const [refresh, setRefresh] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    axios
      .get("http://localhost:5000/sizes/sizesAdmin", {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log(res.data) || setSizes(res.data);
      });
  }, [refresh]);

  return (
    <>
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des tailles</h1>
      <SizesAll sizes={sizes} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Sizes;
