import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import "../style/AdminAll.css";

const ClothesAll = (props) => {
  const { clothes, refresh, setRefresh } = props;
  console.log("clothes in ClothesAll", clothes);

  function deleteClothe(id) {
    axios
      .delete(`http://localhost:5000/clothes/${id}`)
      .then(() => setRefresh(!refresh));
  }

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
                  <Link to={`/admin/clothesEdit/${clothe.id}`}>
                    <MdEdit className="actionIcon" />
                  </Link>
                  <BsFillTrashFill
                    className="actionIcon"
                    onClick={() => {
                      window.confirm(
                        `Êtes-vous sûr de vouloir supprimer cet article : ${clothe.name} ?`
                      ) && deleteClothe(clothe.id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClothesAll;
