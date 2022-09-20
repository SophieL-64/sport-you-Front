// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { Link } from "react-router-dom";
import "../style/Admin.css";

const AdminHome = () => {
  return (
    <>
      <h1 className="adminTitle">Bienvenue sur l'interface Admin</h1>
      <div className="admin">
        <div className="adminInfo">
          <label htmlFor="adminName">identifiant</label>
          <input type="text" id="adminName" />
        </div>
        <div className="adminInfo">
          <label htmlFor="adminpassword">mot de passe</label>
          <input type="password" id="adminpassword" />
        </div>
        <Link to={`/admin/dashboard`}>
          <button className="adminButton">Se connecter</button>
        </Link>
      </div>
    </>
  );
};

export default AdminHome;
