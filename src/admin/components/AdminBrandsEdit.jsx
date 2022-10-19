import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";

import "../style/AdminAddEdit.css";

const AdminBrandsEdit = () => {
  let params = useParams();
  let { id } = params;
  const { adminToken } = useAdmin();

  const [defaultValue, setDefaultValue] = useState({});
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState({});
  const [brandCountry, setBrandCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  //charge données pré-existantes : table brands //
  useEffect(() => {
    axios
      .get(`http://localhost:5000/brands/edit/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        setDefaultValue(res.data[0]);
        setBrandName(res.data[0].name);
        setBrandImage({
          filepreview: res.data[0].logo,
        });
        setBrandCountry(res.data[0].country);
      });
  }, []);

  console.log("defaultValue", defaultValue);

  const editImg = (event) => {
    setBrandImage({
      ...brandImage,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    brandName !== defaultValue.name && formdata.append("name", brandName);
    brandImage.filepreview !== defaultValue.logo &&
      formdata.append("logo", brandImage.file);
    brandCountry !== defaultValue.country &&
      formdata.append("country", brandCountry);

    axios
      .put(`http://localhost:5000/brands/${id}`, formdata, {
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
            message: "Modification de la marque validée",
            uploadOk: res.data.success,
          });
        } else {
          setIsSuccess({
            message: "Modification de la marque refusée",
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
      <Link to="/admin/brands">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Modification de la marque</h1>

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
              value={brandName}
              maxLength="100"
              onChange={(e) => setBrandName(e.target.value)}
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
            name="image"
            onChange={editImg}
          />
          {brandImage.filepreview ? (
            <img
              className="adminImgApercu"
              src={
                brandImage.filepreview != defaultValue.logo
                  ? brandImage.filepreview
                  : `http://localhost:5000/images/brands/${brandImage.filepreview}`
              }
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
              value={brandCountry}
              maxLength="100"
              onChange={(e) => setBrandCountry(e.target.value)}
            />
            <p className="char">
              {brandName && 100 - brandName.length} caractères restants
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

export default AdminBrandsEdit;
