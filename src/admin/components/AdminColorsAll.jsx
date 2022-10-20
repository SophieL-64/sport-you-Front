import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill, BsSearch } from "react-icons/bs";
import "../style/AdminAll.css";

const ColorsAll = (props) => {
  const { colors, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  // console.log("colors in ColorsAll", colors);
  const [searchInput, setSearchInput] = useState("");

  function deleteColor(id) {
    axios
      .delete(`http://localhost:5000/colors/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/colorsAdd"}>
        <button className="adminAddButton">Ajouter une couleur</button>
      </Link>
      <div className="adminSearchBar">
        <BsSearch className="actionIcon" />
        <input
          id="search"
          name="search"
          type="text"
          placeholder="tapez votre recherche"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="adminSearchInput"
        />
      </div>
      <table className="adminTable">
        <thead>
          <tr>
            <td className="adminColumn">nom de la couleur</td>
            <td className="adminColumn">image</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {colors &&
            colors
              .filter((color) =>
                color.name.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((color) => (
                <tr key={color.id}>
                  <td>{color.name}</td>
                  <td>{color.image}</td>
                  <td>
                    <Link to={`/admin/colorsEdit/${color.id}`}>
                      <MdEdit className="actionIcon" color="black" />
                    </Link>{" "}
                    <BsFillTrashFill
                      className="actionIcon"
                      onClick={() => {
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer cette couleur : ${color.name} ?`
                        ) && deleteColor(color.id);
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

export default ColorsAll;
