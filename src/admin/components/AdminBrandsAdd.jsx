import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import "../style/AdminAddEdit.css";

const AdminBrandsAdd = () => {
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState({
    file: "",
    filepreview: null,
  });
  const [brandCountry, setBrandCountry] = useState("");

  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const { adminToken } = useAdmin();

  const editImg = (event) => {
    setBrandImage({
      ...brandImage,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", brandName);
    formdata.append("logo", brandImage.file);
    formdata.append("country", brandCountry);

    axios
      .post(`http://localhost:5000/brands/`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.warn(res);
        if (res.data.success === 1) {
          setIsSuccess({
            message: "Ajout de la marque validé",
            uploadOk: res.data.success,
          });
        } else {
          setIsSuccess({
            message: "Ajout de la marque refusé",
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
      <Link to="/admin/brands">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Ajout d'une marque</h1>
      <form className="adminForm" action="submit" onSubmit={handleSubmit}>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminName">
            Nom de la marque
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminName"
              name="adminName"
              placeholder="nom de la marque"
              maxLength="100"
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
            <p className="char">
              {brandName && 100 - brandName.length} caractères restants
            </p>
          </div>
        </div>
        <div className="adminChamp">
          <label htmlFor="adminImage" className="adminLabel">
            Logo
          </label>
          <input
            className="adminInput"
            type="file"
            name="brandImg"
            onChange={editImg}
            required
          />
          {brandImage.filepreview !== null ? (
            <img
              className="adminImgApercu"
              src={brandImage.filepreview}
              alt="UploadImage"
            />
          ) : null}
        </div>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminCountry">
            Pays de la marque
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminCountry"
              name="adminCountry"
              placeholder="pays de la marque"
              maxLength="100"
              onChange={(e) => setBrandCountry(e.target.value)}
              required
            />
            <p className="char">
              {brandCountry && 100 - brandCountry.length} caractères restants
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

export default AdminBrandsAdd;
