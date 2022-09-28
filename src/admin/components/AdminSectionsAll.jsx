import axios from "axios";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import "../style/AdminAll.css";

const SectionsAll = (props) => {
  const { sections, refresh, setRefresh } = props;
  console.log("sections in SectionsAll", sections);

  function deleteSection(id) {
    axios
      .delete(`http://localhost:5000/sections/${id}`)
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/sectionsAdd"}>
        <button className="adminAddButton">Ajouter un rayon</button>
      </Link>
      <table className="adminTable">
        <thead>
          <tr>
            <td className="adminColumn">Rayon</td>
            <td className="adminColumn">Actions</td>
          </tr>
        </thead>
        <tbody>
          {sections &&
            sections.map((section) => (
              <tr key={section.id}>
                <td>{section.name}</td>
                <td>
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
