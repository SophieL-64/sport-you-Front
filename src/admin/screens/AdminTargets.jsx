import { useState, useEffect } from "react";
import axios from "axios";
import TargetsAll from "../components/AdminTargetsAll";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";

const Targets = () => {
  const [targets, setTargets] = useState();
  const [refresh, setRefresh] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    axios
      .get("http://localhost:5000/targets/targetsAdmin", {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log(res.data) || setTargets(res.data);
      });
  }, [refresh]);

  return (
    <>
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des cibles commerciales</h1>
      <TargetsAll targets={targets} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Targets;
