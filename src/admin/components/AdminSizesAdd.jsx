import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../style/AdminAddEdit.css";

const AdminSizesAdd = () => {
  const [sizeAdded, setSizeAdded] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      size: sizeAdded,
    };
    axios.post("http://localhost:5000/sizes/add", data).then((res) => {
      if (res.data.success === 1) {
        setIsSuccess({
          message: "Ajout de la taille validé",
          uploadOk: res.data.success,
        });
      } else {
        setIsSuccess({
          message: "Ajout de la taille refusé",
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
      <Link to="/admin/sizes">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Ajout d'une taille</h1>
      <form className="adminForm" action="submit" onSubmit={handleSubmit}>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminSize">
            Taille
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminSize"
              name="adminSize"
              placeholder="désignation de la taille"
              maxLength="4"
              onChange={(e) => setSizeAdded(e.target.value)}
              required
            />
            <p className="char">
              {sizeAdded && 4 - sizeAdded.length} caractères restants
            </p>
          </div>
        </div>
        <div>
          {isSuccess !== null ? (
            <h4 style={styles.isUpload}>{isSuccess.message}</h4>
          ) : null}
        </div>
        <button className="formButton" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AdminSizesAdd;