// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { Link } from "react-router-dom";
import Logout from "../authentification/Logout";
import "../style/Admin.css";

const Dashboard = () => {
  return (
    <>
      <h1 className="adminTitle">Bienvenue sur le tableau de bord</h1>
      <Link to="/logout">
        <Logout />
      </Link>
      <div className="admin">
        <Link to={`/admin/admins`}>
          <button className="adminEntry red">
            Gérer les comptes administrateurs
          </button>
        </Link>
        <Link to={`/admin/clothes`}>
          <button className="adminEntry">Gérer les articles</button>
        </Link>
        <Link to={`/admin/sizes`}>
          <button className="adminEntry">Gérer les tailles</button>
        </Link>
        <Link to={`/admin/colors`}>
          <button className="adminEntry">Gérer les couleurs</button>
        </Link>
        <Link to={`/admin/brands`}>
          <button className="adminEntry">Gérer les marques</button>
        </Link>
        <Link to={`/admin/sections`}>
          <button className="adminEntry">Gérer les rayons</button>
        </Link>
        <Link to={`/admin/targets`}>
          <button className="adminEntry">Gérer les cibles commerciales</button>
        </Link>
        <Link to={`/admin/feedbacks`}>
          <button className="adminEntry yellow">
            Gérer les feedbacks des clients
          </button>
        </Link>
        <Link to={`/admin/faqs`}>
          <button className="adminEntry orange">Gérer les FAQ</button>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
