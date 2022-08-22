import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import "./Clothes.css";

const Clothes = (props) => {
  const { result } = props;

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div
      className={showModal ? "allClothes + allClothesWhenModal" : "allClothes"}
    >
      {result.map((clothe) => (
        <div
          className="eachClothe"
          onClick={() => {
            console.log("id", clothe.id);
            setId(clothe.id);
            openModal();
          }}
        >
          <img
            src={require(`../assets/clothes/${clothe.image}`)}
            alt={clothe.name}
            className="clotheImage"
          />
          <h2 className="clotheName">{clothe.name}</h2>
          <p className="clothePrice">{clothe.price}</p>
          <div className="clotheBrandLogo">
            <img
              src={require(`../assets/brands/${clothe.logo}`)}
              alt={clothe.brand}
              className="clotheLogo"
            />
          </div>
        </div>
      ))}
      <Modal showModal={showModal} setShowModal={setShowModal} id={id} />
    </div>
  );
};
export default Clothes;
