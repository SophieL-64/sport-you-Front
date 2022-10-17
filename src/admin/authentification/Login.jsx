import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../contexts/UserProvider";
import axios from "axios";
import "../style/Admin.css";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const { setUserToken } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: userEmail,
      password: userPassword,
    };
    axios
      .post("http://localhost:5000/users/login", data)
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
          setUserToken({
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
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="adminInfo">
          <label htmlFor="adminpassword">mot de passe</label>
          <input
            type="password"
            id="adminpassword"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
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
      </form>
    </>
  );
};

export default Login;
