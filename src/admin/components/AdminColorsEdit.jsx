import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";

import "../style/AdminAddEdit.css";

const AdminColorsEdit = () => {
  let params = useParams();
  let { id } = params;
  const { adminToken } = useAdmin();

  const [defaultValue, setDefaultValue] = useState({});
  const [colorName, setColorName] = useState("");
  const [colorImage, setColorImage] = useState({});
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  //charge données pré-existantes : table clothes //
  useEffect(() => {
    axios
      .get(`http://localhost:5000/colors/edit/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        setDefaultValue(res.data[0]);
        setColorName(res.data[0].name);
        setColorImage({
          filepreview: res.data[0].image,
        });
      });
  }, []);

  console.log("defaultValue", defaultValue);

  const editImg = (event) => {
    setColorImage({
      ...colorImage,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    colorName !== defaultValue.name && formdata.append("name", colorName);
    colorImage.filepreview !== defaultValue.image &&
      formdata.append("image", colorImage.file);

    axios
      .put(`http://localhost:5000/colors/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.warn(res);
        if (res.data.success === 1) {
          setIsSuccess({
            message: "Modification de la couleur validée",
            uploadOk: res.data.success,
          });
        } else {
          setIsSuccess({
            message: "Modification de la couleur refusée",
            uploadOk: res.data.success,
          });
        }
      });
  };

  console.log("FormData", FormData);

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
      <h1 className="adminTitle">Modification de la couleur</h1>

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
              value={colorName}
              maxLength="100"
              onChange={(e) => setColorName(e.target.value)}
            />
            <p className="char">
              {colorName && 100 - colorName.length} caractères restants
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
            name="image"
            onChange={editImg}
          />
          {colorImage.filepreview ? (
            <img
              className="adminImgApercu"
              src={
                colorImage.filepreview != defaultValue.image
                  ? colorImage.filepreview
                  : `http://localhost:5000/images/colors/${colorImage.filepreview}`
              }
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
          Modifier
        </button>
      </form>
    </div>
  );
};

export default AdminColorsEdit;
