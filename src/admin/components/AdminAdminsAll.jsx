import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";
import { BsFillTrashFill } from "react-icons/bs";
import "../style/AdminAll.css";

const AdminsAll = (props) => {
  const { admins, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  console.log("admins in AdminsAll", admins);

  function deleteAdmin(id) {
    axios
      .delete(`http://localhost:5000/admins/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/register"}>
        <button className="adminAddButton">Ajouter un administrateur</button>
      </Link>
      <table className="adminTable">
        <thead>
          <tr>
            <td className="adminColumn">nom de l'administrateur</td>
            <td className="adminColumn">email</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {admins &&
            admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.adminName}</td>
                <td>{admin.email}</td>

                <td>
                  {admin.id !== 1 && (
                    <BsFillTrashFill
                      className="actionIcon"
                      onClick={() => {
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer cet administrateur : ${admin.adminName} ?`
                        ) && deleteAdmin(admin.id);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsAll;
