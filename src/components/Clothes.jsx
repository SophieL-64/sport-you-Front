import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import "./Clothes.css";
import NoResult from "./NoResult";

const Clothes = (props) => {
  const { clothes, totalItems, setTotalItems, getNumberProduct } = props;

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    console.log("chaton");
  }, [showModal]);

  return (
    <div
      className={showModal ? "allClothes allClothesWhenModal" : "allClothes"}
    >
      {clothes.length ? (
        clothes.map((clothe) => (
          <div
            key={clothe.id}
            className="eachClothe"
            onClick={() => {
              console.log("id", clothe.id);
              setId(clothe.id);
              openModal();
            }}
          >
            <img
              src={`http://localhost:5000/images/clothes/${clothe.image}`}
              alt={clothe.name}
              className="clotheImage"
            />
            <h2 className="clotheName">{clothe.name}</h2>
            <p className="clothePrice">{clothe.price}</p>
            <div className="clotheBrandLogo">
              <img
                src={`http://localhost:5000/images/brands/${clothe.logo}`}
                alt={clothe.brand}
                className="clotheLogo"
              />
            </div>
          </div>
        ))
      ) : (
        <NoResult />
      )}

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          id={id}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          getNumberProduct={getNumberProduct}
        />
      )}
    </div>
  );
};
export default Clothes;
