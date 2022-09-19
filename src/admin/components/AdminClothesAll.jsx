// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import "../style/AdminAll.css";

const ClothesAll = (props) => {
  const { clothes } = props;
  console.log("clothes in ClothesAll", clothes);

  return (
    <div className="adminPage">
      <Link to={"/admin/clothesAdd"}>
        <button className="adminAddButton">Ajouter un article</button>
      </Link>
      <table className="adminTable">
        <thead>
          <tr>
            <td className="adminColumn">nom de l'article</td>
            <td className="adminColumn">description</td>
            <td className="adminColumn">image</td>
            <td className="adminColumn">prix</td>
            <td className="adminColumn">marque</td>
            <td className="adminColumn">rayon</td>
            <td className="adminColumn">cible</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {clothes &&
            clothes.map((clothe) => (
              <tr key={clothe.id}>
                <td>{clothe.name}</td>
                <td>{clothe.description}</td>
                <td>{clothe.image}</td>
                <td>{clothe.price}</td>
                <td>{clothe.brand}</td>
                <td>{clothe.section}</td>
                <td>{clothe.target}</td>
                <td>
                  <MdEdit className="actionIcon" />{" "}
                  <BsFillTrashFill className="actionIcon" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClothesAll;
