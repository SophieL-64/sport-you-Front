// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { Link } from "react-router-dom";
import "../style/Admin.css";

const Dashboard = () => {
  return (
    <>
      <h1 className="adminTitle">Bienvenue sur le dashboard</h1>
      <div className="admin">
        <Link to={`/admin/clothes`}>
          <button className="adminEntry">Gérer les articles</button>
        </Link>
        <Link to={`/admin/feedbacks`}>
          <button className="adminEntry">
            Gérer les feedbacks des clients
          </button>
        </Link>
        <Link to={`/admin/faq`}>
          <button className="adminEntry">Gérer les FAQ</button>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
