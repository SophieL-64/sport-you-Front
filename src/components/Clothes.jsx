// import { useEffect, useState } from "react";
import "./Clothes.css";

const Clothes = (props) => {
  const { clothes } = props;

  return (
    <div className="allClothes">
      {clothes.map((clothe) => (
        <div className="eachClothe">
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
    </div>
  );
};
export default Clothes;
