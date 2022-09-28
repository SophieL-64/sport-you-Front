import { useState, useEffect } from "react";
import axios from "axios";
import SectionsAll from "../components/AdminSectionsAll";
import { Link } from "react-router-dom";

const Sections = () => {
  const [sections, setSections] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/sections/sectionsAdmin").then((res) => {
      console.log(res.data) || setSections(res.data);
    });
  }, [refresh]);

  return (
    <>
      {console.log("sections", sections)}
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des rayons</h1>
      <SectionsAll
        sections={sections}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default Sections;
