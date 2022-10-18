import { useState, useEffect } from "react";
import axios from "axios";
import AdminsAll from "../components/AdminAdminsAll";
import { Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";

const Admins = () => {
  const [admins, setAdmins] = useState();
  const [refresh, setRefresh] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    axios
      .get("http://localhost:5000/admins", {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log(res.data) || setAdmins(res.data);
      });
  }, [refresh]);

  return (
    <>
      {console.log("admins", admins)}
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Gestion des administrateurs</h1>
      <AdminsAll admins={admins} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Admins;
