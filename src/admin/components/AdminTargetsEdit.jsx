import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";

import "../style/AdminAddEdit.css";

const AdminTargetsEdit = () => {
  let params = useParams();
  let { id } = params;
  const { adminToken } = useAdmin();

  const [defaultValue, setDefaultValue] = useState({});
  const [targetName, setTargetName] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  //charge données pré-existantes : table sections //
  useEffect(() => {
    axios
      .get(`http://localhost:5000/targets/edit/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log("res.data", res.data[0].name);
        setDefaultValue(res.data[0]);
        setTargetName(res.data[0].name);
      });
  }, []);

  console.log("targetName", targetName);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: targetName,
    };

    axios
      .put(`http://localhost:5000/targets/${id}`, data, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.warn(res);
        if (res.data.success === 1) {
          setIsSuccess({
            message: "Modification de la cible commerciale validée",
            uploadOk: res.data.success,
          });
        } else {
          setIsSuccess({
            message: "Modification de la cible commerciale refusée",
            uploadOk: res.data.success,
          });
        }
      });
  };

  useEffect(() => {
    if (isSuccess?.uploadOk) {
      const timer = setTimeout(() => navigate(-1), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const styles = {
    isUpload: {
      color: isSuccess?.uploadOk ? "rgb(30, 211, 45)" : "rgb(255, 71, 71)",
      textAlign: "center",
      border: "1px solid grey",
      borderRadius: "8px",
      padding: "1rem",
      margin: "1.5em 0 0 0",
    },
  };

  return (
    <div>
      <Link to="/admin/targets">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Modification de la cible commerciale</h1>

      <form className="adminForm" action="submit" onSubmit={handleSubmit}>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminSection">
            Nom de la cible commerciale
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminTarget"
              name="adminTarget"
              value={targetName}
              maxLength="100"
              onChange={(e) => setTargetName(e.target.value)}
              required
            />
            <p className="char">
              {targetName && 100 - targetName.length} caractères restants
            </p>
          </div>
        </div>
        <div>
          {isSuccess !== null ? (
            <h4 style={styles.isUpload}>{isSuccess.message}</h4>
          ) : null}
        </div>
        <button className="formButton" type="submit">
          Modifier
        </button>
      </form>
    </div>
  );
};

export default AdminTargetsEdit;
