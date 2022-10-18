import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";
import axios from "axios";
import "../style/Admin.css";

const Login = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const { setAdminToken } = useAdmin();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: adminEmail,
      password: adminPassword,
    };
    axios
      .post("http://localhost:5000/admins/login", data)
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
            message: "Vous allez être redirigé(e) vers le tableau de bord",
            uploadOk: res.data.success,
          });
          setAdminToken({
            token: res.data.credentials,
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
      <h1 className="adminTitle">Bienvenue sur l'interface Admin</h1>
      <form className="admin" onSubmit={handleLogin}>
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
          <label htmlFor="adminpassword">mot de passe</label>
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
          Se connecter
        </button>
        <p>
          Seul un administrateur déjà créé peut créer un nouveau compte
          administrateur. <br></br>Pour créer un nouveau compte admin à un de
          vos collaborateurs, merci de vous logger d'abord.
        </p>
      </form>
    </>
  );
};

export default Login;
