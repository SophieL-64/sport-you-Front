import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import "../style/AdminAddEdit.css";

const AdminColorsAdd = () => {
  const [colorName, setColorName] = useState("");
  const [colorImage, setColorImage] = useState({
    file: "",
    filepreview: null,
  });

  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const { adminToken } = useAdmin();

  const editImg = (event) => {
    setColorImage({
      ...colorImage,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  // console.log(
  //   "colorName",
  //   colorName,
  //   "colorImage.file",
  //   colorImage.file,
  //   "clothePrice"
  // );
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", colorName);
    formdata.append("image", colorImage.file);

    axios
      .post(`http://localhost:5000/colors/`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        // console.log("res", res);
        if (res.data.validationErrors) {
          setIsSuccess({
            message:
              "Ajout de la couleur refusé : " +
              res.data.validationErrors[0].message,
            uploadOk: 0,
          });
        } else {
          console.log("res", res);
          setIsSuccess({
            message: "Ajout de la couleur validé",
            uploadOk: res.data.success,
          });
        }
      })
      .catch(
        (err) =>
          console.log("err", err) ||
          setIsSuccess({
            message:
              "Ajout de la couleur refusé : " + err.response.data.message,
            uploadOk: err.response.data.success,
          })
      );
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
      <Link to="/admin/colors">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Ajout d'une couleur</h1>
      <form className="adminForm" action="submit" onSubmit={handleSubmit}>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminName">
            Nom de la couleur
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminName"
              name="adminName"
              placeholder="nom de la couleur"
              maxLength="45"
              onChange={(e) => setColorName(e.target.value)}
              required
            />
            <p className="char">
              {colorName && 45 - colorName.length} caractères restants
            </p>
          </div>
        </div>
        <div className="adminChamp">
          <label htmlFor="adminImage" className="adminLabel">
            Image
          </label>
          <input
            className="adminInput"
            type="file"
            name="colorImg"
            onChange={editImg}
            required
          />
          {colorImage.filepreview !== null ? (
            <img
              className="adminImgApercu"
              src={colorImage.filepreview}
              alt="UploadImage"
            />
          ) : null}
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

export default AdminColorsAdd;
