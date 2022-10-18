import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";
import axios from "axios";
import "../style/Admin.css";

const Register = () => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const { adminToken } = useAdmin();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      adminName: adminName,
      email: adminEmail,
      password: adminPassword,
    };
    axios
      .post("http://localhost:5000/admins", data, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.validationErrors) {
          setIsSuccess({
            message: res.data.validationErrors[0].message,
            uploadOk: 0,
          });
        } else {
          console.log("res", res);
          setIsSuccess({
            message:
              "Votre compte a bien été créé, vous allez être redirigé(e) vers le tableau de bord",
            uploadOk: res.data.success,
          });
        }
      })
      .catch(
        (err) =>
          console.log("err", err) ||
          setIsSuccess({
            message: err.response.data.message,
            uploadOk: err.response.data.success,
          })
      );
  };

  useEffect(() => {
    if (isSuccess?.uploadOk === 2) {
      const timer = setTimeout(() => navigate("/admin/dashboard"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const styles = {
    isUpload: {
      color:
        isSuccess?.uploadOk === 2 ? "rgb(30, 211, 45)" : "rgb(255, 71, 71)",
      textAlign: "center",
      border: "1px solid grey",
      borderRadius: "8px",
      padding: "1rem",
      margin: "1.5em 0 0 0",
    },
  };

  return (
    <>
      <Link to="/admin/admins">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Ajout d'un administrateur</h1>
      <form className="admin" onSubmit={handleRegister}>
        <div className="adminInfo">
          <label htmlFor="adminName">Prénom Nom</label>
          <input
            type="text"
            id="adminName"
            value={adminName}
            onChange={(e) => {
              setAdminName(e.target.value);
            }}
            required
          />
        </div>
        <div className="adminInfo">
          <label htmlFor="adminEmail">Email</label>
          <input
            type="text"
            id="adminEmail"
            value={adminEmail}
            onChange={(e) => {
              setAdminEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="adminInfo">
          <label htmlFor="adminpassword">Mot de passe</label>
          <input
            type="password"
            id="adminpassword"
            value={adminPassword}
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
            required
          />
        </div>
        <div>
          {isSuccess?.uploadOk != null ? (
            <h4 style={styles.isUpload}>{isSuccess.message}</h4>
          ) : null}
        </div>
        <button className="adminButton" type="submit">
          Créer un compte
        </button>
      </form>
    </>
  );
};

export default Register;
