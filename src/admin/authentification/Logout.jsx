// import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";
import "../style/Admin.css";

const Logout = () => {
  const { setAdminToken } = useAdmin();
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setAdminToken(null);
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <>
      <button className="logOutButton" onClick={(e) => handleLogout(e)}>
        Se déconnecter
      </button>
    </>
  );
};
export default Logout;
