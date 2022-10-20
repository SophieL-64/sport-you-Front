import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SectionsOptions from "./SectionsOptions";
import BrandsOptions from "./BrandsOptions";
import TargetsOptions from "./TargetsOptions";
import { useParams } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";

import "../style/AdminAddEdit.css";

const AdminClothesEdit = () => {
  let params = useParams();
  let { id } = params;
  const { adminToken } = useAdmin();

  const [defaultValue, setDefaultValue] = useState({});
  const [clotheName, setClotheName] = useState("");
  const [clotheDescription, setClotheDescription] = useState("");
  const [clotheImage, setClotheImage] = useState({});
  const [clothePrice, setClothePrice] = useState();
  const [clotheSectionId, setClotheSectionId] = useState();
  const [clotheBrandId, setClotheBrandId] = useState();
  const [clotheTargetId, setClotheTargetId] = useState();
  const [clotheSizesId, setClotheSizesId] = useState([]);
  const [clotheColorsId, setClotheColorsId] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  // for brands mapping
  const [brands, setBrands] = useState([]);
  // for sections mapping
  const [sections, setSections] = useState([]);
  // for targets mapping
  const [targets, setTargets] = useState([]);
  // for sizes mapping
  const [sizes, setSizes] = useState([]);
  // for colors mapping
  const [colors, setColors] = useState([]);

  //charge données pré-existantes : table clothes //
  useEffect(() => {
    axios
      .get(`http://localhost:5000/clothes/edit/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        setDefaultValue(res.data[0]);
        setClotheName(res.data[0].name);
        setClotheDescription(res.data[0].description);
        setClothePrice(res.data[0].price);
        setClotheSectionId(res.data[0].sections_id);
        setClotheBrandId(res.data[0].brands_id);
        setClotheTargetId(res.data[0].targets_id);
        setClotheImage({
          filepreview: res.data[0].image,
        });
      });
  }, []);

  // console.log("defaultValue", defaultValue);

  const editImg = (event) => {
    setClotheImage({
      ...clotheImage,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  //charge données pré-existantes : table de jointure sizes //
  useEffect(() => {
    let SArr = [];
    axios
      .get(`http://localhost:5000/sizes/clotheEdit/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        for (const size of res.data) {
          SArr.push(size.sizes_id);
        }
        setClotheSizesId(SArr);
      });
  }, []);

  //charge données pré-existantes : table de jointure colors//
  useEffect(() => {
    let CArr = [];
    axios
      .get(`http://localhost:5000/colors/clotheEdit/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        for (const color of res.data) {
          CArr.push(color.colors_id);
        }
        setClotheColorsId(CArr);
      });
  }, []);

  // pour le mapping des brands dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/brands`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => setBrands(res.data));
  }, []);
  // pour le mapping des sections dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/sections/sectionsAdmin`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => setSections(res.data));
  }, []);
  // pour le mapping des targets dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/targets/targetsAdmin`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => setTargets(res.data));
  }, []);

  // pour le mapping de toutes les tailles dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/sizes/sizesAdmin`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => setSizes(res.data));
  }, []);
  // pour le mapping de tous les coloris dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/colors/colorsAdmin`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => setColors(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    clotheName !== defaultValue.name && formdata.append("name", clotheName);
    clotheDescription !== defaultValue.description &&
      formdata.append("description", clotheDescription);
    clotheImage.filepreview !== defaultValue.image &&
      formdata.append("image", clotheImage.file);
    clothePrice !== defaultValue.price && formdata.append("price", clothePrice);
    clotheSectionId !== defaultValue.sections_id &&
      formdata.append("sections_id", clotheSectionId);
    clotheBrandId !== defaultValue.brands_id &&
      formdata.append("brands_id", clotheBrandId);
    clotheTargetId !== defaultValue.targets_id &&
      formdata.append("targets_id", clotheTargetId);
    clotheSizesId !== defaultValue.sizesAvailables &&
      formdata.append("sizesAvailables", clotheSizesId);
    clotheColorsId !== defaultValue.colorsAvailables &&
      formdata.append("colorsAvailables", clotheColorsId);

    axios
      .put(`http://localhost:5000/clothes/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        // console.log("res", res);
        if (res.data.validationErrors) {
          setIsSuccess({
            message:
              "Modification de l'article refusé : " +
              res.data.validationErrors[0].message,
            uploadOk: 0,
          });
        } else {
          console.log("res", res);
          setIsSuccess({
            message: "Modification de l'article validé",
            uploadOk: res.data.success,
          });
        }
      })
      .catch(
        (err) =>
          console.log("err", err) ||
          setIsSuccess({
            message:
              "Modification de l'article refusé : " + err.response.data.message,
            uploadOk: err.response.data.success,
          })
      );
  };

  // console.log("FormData", FormData);

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

  function handleSizesCheckboxes(e) {
    let sizesArr = [...clotheSizesId];
    sizesArr.includes(parseInt(e.target.value))
      ? (sizesArr = sizesArr.filter((size) => size != e.target.value))
      : sizesArr.push(parseInt(e.target.value));
    setClotheSizesId(sizesArr);
  }

  function handleColorsCheckboxes(e) {
    let colorsArr = [...clotheColorsId];
    colorsArr.includes(parseInt(e.target.value))
      ? (colorsArr = colorsArr.filter((color) => color != e.target.value))
      : colorsArr.push(parseInt(e.target.value));
    setClotheColorsId(colorsArr);
  }

  return (
    <div>
      {/* {console.log(
        "clotheImage",
        clotheImage,
        "clotheImage.filepreview",
        clotheImage.filepreview,
        "defaultValue.image",
        defaultValue.image
      )} */}
      <Link to="/admin/clothes">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle">Modification de l'article</h1>

      <form className="adminForm" action="submit" onSubmit={handleSubmit}>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminName">
            Nom de l'article
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminName"
              name="adminName"
              value={clotheName}
              maxLength="100"
              onChange={(e) => setClotheName(e.target.value)}
            />
            <p className="char">
              {clotheName && 100 - clotheName.length} caractères restants
            </p>
          </div>
        </div>
        <div className="adminChamp">
          <label htmlFor="adminDescr" className="adminLabel">
            Description
          </label>
          <div>
            <textarea
              className="adminTextArea"
              type="text"
              id="adminDescr"
              name="adminDescr"
              value={clotheDescription}
              maxLength="300"
              onChange={(e) => setClotheDescription(e.target.value)}
            />
            <p className="char">
              {clotheDescription && 300 - clotheDescription.length} caractères
              restants
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
          {clotheImage.filepreview ? (
            <img
              className="adminImgApercu"
              src={
                clotheImage.filepreview != defaultValue.image
                  ? clotheImage.filepreview
                  : `http://localhost:5000/images/clothes/${clotheImage.filepreview}`
              }
              alt="UploadImage"
            />
          ) : null}
        </div>
        <div className="adminChamp">
          <label htmlFor="adminPrice" className="adminLabel">
            Prix
          </label>
          <input
            className="adminInput"
            type="number"
            id="adminPrice"
            name="adminPrice"
            value={clothePrice}
            onChange={(e) => setClothePrice(e.target.value)}
          />
        </div>
        <div className="adminChamp">
          <label htmlFor="adminSectionChoice" className="adminLabel">
            Rayon
          </label>
          <select
            required
            className="adminSelect"
            value={clotheSectionId}
            onChange={(e) => setClotheSectionId(e.target.value)}
            id="adminSectionChoice"
            name="adminSectionChoice"
          >
            <option className="adminOption" value="">
              ...
            </option>
            {sections.map((section) => (
              <SectionsOptions
                sectionName={section.name}
                Sid={section.id}
                key={section.id}
              />
            ))}
          </select>
        </div>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminBrandChoice">
            Marque
          </label>
          <select
            required
            className="adminSelect"
            value={clotheBrandId}
            onChange={(e) => setClotheBrandId(e.target.value)}
            id="adminBrandChoice"
            name="adminBrandChoice"
          >
            <option className="adminOption" value="">
              ...
            </option>
            {brands.map((brand) => (
              <BrandsOptions
                brandName={brand.name}
                Bid={brand.id}
                key={brand.id}
              />
            ))}
          </select>
        </div>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminChoice">
            Cible
          </label>
          <select
            required
            className="adminSelect"
            value={clotheTargetId}
            onChange={(e) => setClotheTargetId(e.target.value)}
          >
            <option className="adminOption" value="">
              ...
            </option>
            {targets.map((target) => (
              <TargetsOptions
                targetName={target.name}
                Tid={target.id}
                key={target.id}
              />
            ))}
          </select>
        </div>
        <div className="adminChamp2">
          <p className="adminLabel">Tailles disponibles</p>
          <div className="adminCheckbox">
            {sizes.map((size) => (
              <label className="adminBox" key={size.id}>
                {/* {console.log(
                  "clotheSizesId",
                  clotheSizesId,
                  "size.id",
                  size.id,
                  "clotheSizesId.includes(size.id)",
                  clotheSizesId.includes(size.id)
                )} */}
                <input
                  type="checkbox"
                  value={size.id}
                  checked={clotheSizesId.includes(size.id)}
                  onChange={(e) => handleSizesCheckboxes(e)}
                />{" "}
                {size.size}
              </label>
            ))}
          </div>
        </div>
        <div className="adminChamp2">
          <p className="adminLabel">Coloris disponibles</p>
          <div className="adminCheckbox">
            {colors.map((color) => (
              <label className="adminBox" key={color.id}>
                <input
                  type="checkbox"
                  value={color.id}
                  checked={clotheColorsId.includes(color.id)}
                  onChange={(e) => handleColorsCheckboxes(e)}
                />{" "}
                {color.name}
              </label>
            ))}
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

export default AdminClothesEdit;
