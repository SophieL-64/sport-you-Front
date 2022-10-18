import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import "../style/AdminAll.css";

const TargetsAll = (props) => {
  const { targets, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  console.log("targets in TargetsAll", targets);

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
      <table className="adminTable">
        <thead>
          <tr>
            <td className="adminColumn">Cible commerciale</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {targets &&
            targets.map((target) => (
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
