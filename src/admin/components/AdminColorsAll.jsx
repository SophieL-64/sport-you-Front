import axios from "axios";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import "../style/AdminAll.css";

const ColorsAll = (props) => {
  const { colors, refresh, setRefresh } = props;
  console.log("colors in ColorsAll", colors);

  function deleteColor(id) {
    axios
      .delete(`http://localhost:5000/colors/${id}`)
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/colorsAdd"}>
        <button className="adminAddButton">Ajouter une couleur</button>
      </Link>
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
            colors.map((color) => (
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
