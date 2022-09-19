import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SectionsOptions from "./SectionsOptions";
import BrandsOptions from "./BrandsOptions";
import TargetsOptions from "./TargetsOptions";

import "../style/AdminAddEdit.css";

const AdminClothesAdd = () => {
  const [clotheName, setClotheName] = useState("");
  const [clotheDescription, setClotheDescription] = useState("");
  const [clotheImage, setClotheImage] = useState({
    file: "",
    filepreview: null,
  });
  const [clothePrice, setClothePrice] = useState();
  const [clotheBrandId, setClotheBrandId] = useState();
  const [clotheSectionId, setClotheSectionId] = useState();
  const [clotheTargetId, setClotheTargetId] = useState();
  const [clotheSizesId, setClotheSizesId] = useState([]);
  const [clotheColorsId, setColorsId] = useState([]);
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

  // pour le mapping des brands dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/brands`)
      .then((res) => setBrands(res.data));
  }, []);
  // pour le mapping des sections dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/sections`)
      .then((res) => setSections(res.data));
  }, []);
  // pour le mapping des targets dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/targets`)
      .then((res) => setTargets(res.data));
  }, []);

  // pour le mapping des tailles disponibles dans menu déroulant
  useEffect(() => {
    axios.get(`http://localhost:5000/sizes`).then((res) => setSizes(res.data));
  }, []);
  // pour le mapping des coloris disponibles dans menu déroulant
  useEffect(() => {
    axios
      .get(`http://localhost:5000/colors`)
      .then((res) => setColors(res.data));
  }, []);

  const editImg = (event) => {
    setClotheImage({
      ...clotheImage,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formdata = new FormData();
  //   formdata.append("name", clotheName);
  //   formdata.append("description", clotheDescription);
  //   formdata.append("image", clotheImage.file);
  //   formdata.append("price", clothePrice);
  //   formdata.append("sections_id", clotheSectionId);
  //   formdata.append("brands_id", clotheBrandId);
  //   formdata.append("targets_id", clotheTargetId);
  //   formdata.append("sizesAvailables", clotheSizesId);
  //   formdata.append("colorsAvailables", clotheColorsId);
  //   axios
  //     .post(`http://localhost:5000/clothes/add`, formdata, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     })
  //     .then((res) => {
  //       // then print response status
  //       console.warn(res);
  //       if (res.data.success === 1) {
  //         setIsSuccess({
  //           message: "Ajout de l'article validé",
  //           uploadOk: res.data.success,
  //         });
  //       } else {
  //         setIsSuccess({
  //           message: "Ajout de l'article refusé",
  //           uploadOk: res.data.success,
  //         });
  //       }
  //     });
  //   // }
  // };

  useEffect(() => {
    if (isSuccess?.uploadOk) {
      const timer = setTimeout(() => navigate(0), 2000);
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

  let sizesArr = [];
  function handleSizesCheckboxes(e) {
    e.preventDefault();
    sizesArr.includes(e.target.value)
      ? sizesArr.filter((size) => size != e.target.value)
      : sizesArr.push(5);
    setClotheSizesId(sizesArr);
    console.log("sizesArr", sizesArr);
    e.preventDefault();
  }
  console.log("clotheSizesId", clotheSizesId);

  return (
    <div className="AdminForm">
      <h1 className="adminTitle">Ajout d'un article</h1>
      <form
        action="submit"
        // onSubmit={handleSubmit}
      >
        <div className="adminChamp">
          <label htmlFor="adminName">Nom de l'article</label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            placeholder="Nom de l'article"
            maxLength="100"
            onChange={(e) => setClotheName(e.target.value)}
            required
          />
          <p className="char">
            {clotheName && 100 - clotheName.length} caractères restants
          </p>
        </div>
        <div className="adminChamp">
          <label htmlFor="adminDescr">Description</label>
          <textarea
            type="text"
            id="adminDescr"
            name="adminDescr"
            placeholder="Description"
            maxLength="300"
            onChange={(e) => setClotheDescription(e.target.value)}
            required
          />
          <p className="char">
            {clotheDescription && 300 - clotheDescription.length} caractères
            restants
          </p>
        </div>
        <div className="adminChamp">
          <label htmlFor="adminImage">Image</label>
          <input type="file" name="clotheImg" onChange={editImg} required />
          {clotheImage.filepreview !== null ? (
            <img
              className="adminImgApercu"
              src={clotheImage.filepreview}
              alt="UploadImage"
            />
          ) : null}
        </div>
        <div className="adminChamp">
          <label htmlFor="adminPrice">Prix</label>
          <input
            type="number"
            id="adminPrice"
            name="adminPrice"
            placeholder="prix de l'article"
            onChange={(e) => setClothePrice(e.target.value)}
            required
          />
        </div>
        <div className="adminChamp">
          <label htmlFor="adminSectionChoice">Rayon</label>
          <select
            required
            className="adminSelect"
            onChange={(e) => setClotheSectionId(e.target.value)}
            id="adminSectionChoice"
            name="adminSectionChoice"
          >
            <option className="adminOption" value="">
              ....
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
          <label htmlFor="adminBrandChoice">Marque</label>
          <select
            required
            className="adminSelect"
            onChange={(e) => setClotheBrandId(e.target.value)}
            id="adminBrandChoice"
            name="adminBrandChoice"
          >
            <option className="adminOption" value="">
              ....
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
          <label htmlFor="adminChoice">Cible</label>
          <select
            required
            className="adminSelect"
            onChange={(e) => setClotheTargetId(e.target.value)}
          >
            <option className="adminOption" value="">
              ....
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
        <div className="adminChamp">
          <p>Tailles disponibles</p>
          <div className="adminCheckbox">
            {sizes.map((size) => (
              <label key={size.id}>
                <input
                  type="checkbox"
                  value={size.id}
                  onChange={(e) => handleSizesCheckboxes(e)}
                />{" "}
                {size.size}
              </label>
            ))}
          </div>
        </div>
        <div className="adminChamp">
          <p>Coloris disponibles</p>
          <div className="adminCheckbox">
            {colors.map((color) => (
              <label key={color.id}>
                <input type="checkbox" /> {color.name}
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
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AdminClothesAdd;
