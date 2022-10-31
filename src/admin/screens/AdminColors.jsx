import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import ColorsAll from "../components/AdminColorsAll";
import { Link } from "react-router-dom";

const Colors = () => {
  const [colors, setColors] = useState();
  const [refresh, setRefresh] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    axios
      .get("http://localhost:5000/colors/colorsAdmin", {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log(res.data) || setColors(res.data);
      });
  }, [refresh]);

  return (
    <>
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des couleurs</h1>
      <ColorsAll colors={colors} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Colors;
