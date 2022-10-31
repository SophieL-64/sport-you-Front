import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill, BsSearch } from "react-icons/bs";
import "../style/AdminAll.css";

const TargetsAll = (props) => {
  const { targets, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  // console.log("targets in TargetsAll", targets);
  const [searchInput, setSearchInput] = useState("");

  function deleteTarget(id) {
    axios
      .delete(`http://localhost:5000/targets/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/targetsAdd"}>
        <button className="adminAddButton">
          Ajouter une cible commerciale
        </button>
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
            <td className="adminColumn">Cible commerciale</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {targets &&
            targets
              .filter((target) =>
                target.name.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((target) => (
                <tr key={target.id}>
                  <td>{target.name}</td>
                  <td>
                    <Link to={`/admin/targetsEdit/${target.id}`}>
                      <MdEdit className="actionIcon" color="black" />
                    </Link>{" "}
                    <BsFillTrashFill
                      className="actionIcon"
                      onClick={() => {
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer cette cible commerciale : ${target.name} ?`
                        ) && deleteTarget(target.id);
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

export default TargetsAll;
