import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill, BsSearch } from "react-icons/bs";
import "../style/AdminAll.css";

const BrandsAll = (props) => {
  const { brands, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  // console.log("brands in BrandsAll", brands);
  const [searchInput, setSearchInput] = useState("");

  function deleteBrand(id) {
    axios
      .delete(`http://localhost:5000/brands/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/brandsAdd"}>
        <button className="adminAddButton">Ajouter une marque</button>
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
            <td className="adminColumn">marque</td>
            <td className="adminColumn">logo</td>
            <td className="adminColumn">pays</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {brands &&
            brands
              .filter(
                (brand) =>
                  brand.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  brand.country
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
              )
              .map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.name}</td>
                  <td>{brand.logo}</td>
                  <td>{brand.country}</td>
                  <td>
                    <Link to={`/admin/brandsEdit/${brand.id}`}>
                      <MdEdit className="actionIcon" color="black" />
                    </Link>{" "}
                    <BsFillTrashFill
                      className="actionIcon"
                      onClick={() => {
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer cette marque : ${brand.name} ?`
                        ) && deleteBrand(brand.id);
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

export default BrandsAll;
