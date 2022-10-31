import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsFillTrashFill, BsSearch } from "react-icons/bs";
import "../style/AdminAll.css";

const SectionsAll = (props) => {
  const { sections, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  // console.log("sections in SectionsAll", sections);
  const [searchInput, setSearchInput] = useState("");

  function deleteSection(id) {
    axios
      .delete(`http://localhost:5000/sections/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/sectionsAdd"}>
        <button className="adminAddButton">Ajouter un rayon</button>
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
            <td className="adminColumn">Rayon</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {sections &&
            sections
              .filter((section) =>
                section.name.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((section) => (
                <tr key={section.id}>
                  <td>{section.name}</td>
                  <td>
                    <Link to={`/admin/sectionsEdit/${section.id}`}>
                      <MdEdit className="actionIcon" color="black" />
                    </Link>{" "}
                    <BsFillTrashFill
                      className="actionIcon"
                      onClick={() => {
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer ce  rayon : ${section.name} ?`
                        ) && deleteSection(section.id);
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

export default SectionsAll;
