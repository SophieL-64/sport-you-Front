import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";
import { BsFillTrashFill, BsSearch } from "react-icons/bs";
import "../style/AdminAll.css";

const SizesAll = (props) => {
  const { sizes, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  // console.log("sizes in SizesAll", sizes);
  const [searchInput, setSearchInput] = useState("");

  function deleteSize(id) {
    axios
      .delete(`http://localhost:5000/sizes/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/sizesAdd"}>
        <button className="adminAddButton">Ajouter une taille</button>
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
            <td className="adminColumn">Taille</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {sizes &&
            sizes
              .filter((size) =>
                size.size.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((size) => (
                <tr key={size.id}>
                  <td>{size.size}</td>
                  <td>
                    <BsFillTrashFill
                      className="actionIcon"
                      onClick={() => {
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer cette taille : ${size.size} ?`
                        ) && deleteSize(size.id);
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

export default SizesAll;
