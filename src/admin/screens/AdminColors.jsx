import { useState, useEffect } from "react";
import axios from "axios";
import ColorsAll from "../components/AdminColorsAll";
import { Link } from "react-router-dom";

const Colors = () => {
  const [colors, setColors] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/colors/colorsAdmin").then((res) => {
      console.log(res.data) || setColors(res.data);
    });
  }, [refresh]);

  return (
    <>
      {console.log("colors", colors)}
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des couleurs</h1>
      <ColorsAll colors={colors} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Colors;
