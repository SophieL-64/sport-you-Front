import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../style/AdminAddEdit.css";

const AdminSectionsAdd = () => {
  const [sectionAdded, setSectionAdded] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: sectionAdded,
    };
    axios.post("http://localhost:5000/sections/", data).then((res) => {
      if (res.data.success === 1) {
        setIsSuccess({
          message: "Ajout du rayon validé",
          uploadOk: res.data.success,
        });
      } else {
        setIsSuccess({
          message: "Ajout du rayon refusé",
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
      <h1 className="adminTitle">Ajout d'un rayon</h1>
      <form className="adminForm" action="submit" onSubmit={handleSubmit}>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminSection">
            Taille
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminSection"
              name="adminSection"
              placeholder="désignation du rayon"
              maxLength="100"
              onChange={(e) => setSectionAdded(e.target.value)}
              required
            />
            <p className="char">
              {sectionAdded && 100 - sectionAdded.length} caractères restants
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

export default AdminSectionsAdd;
