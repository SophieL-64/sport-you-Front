import { useState, useEffect } from "react";
import axios from "axios";
import SectionsAll from "../components/AdminSectionsAll";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";

const Sections = () => {
  const [sections, setSections] = useState();
  const [refresh, setRefresh] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    axios
      .get("http://localhost:5000/sections/sectionsAdmin", {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log(res.data) || setSections(res.data);
      });
  }, [refresh]);

  return (
    <>
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
