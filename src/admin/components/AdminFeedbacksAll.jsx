import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill, BsSearch } from "react-icons/bs";
import "../style/AdminAll.css";

const FeedbacksAll = (props) => {
  const { feedbacks, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  // console.log("feedbacks in feedbacksAll", feedbacks);
  const [searchInput, setSearchInput] = useState("");
  // pour le mapping des types de feed-backs, dans le menu déroulant
  const [inputsTypes, setInputsTypes] = useState([]);
  const [typeSelected, setTypeSelected] = useState("Tous");

  useEffect(() => {
    axios.get("http://localhost:5000/feedbacks/inputTypes").then((res) => {
      setInputsTypes(res.data);
    });
  }, []);

  function deleteFeedback(id) {
    axios
      .delete(`http://localhost:5000/feedbacks/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <div className="adminSearchBar yellow">
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
      <div className="adminSearchBar yellow">
        <label htmlFor="typeOptions">Filtrer par type de feedback</label>
        <select
          name="typeOptions"
          id="typeOptions"
          onChange={(e) => {
            setTypeSelected(e.target.value);
          }}
          required
        >
          <option value="Tous">Tous</option>
          {inputsTypes.length &&
            inputsTypes.map((type) => (
              <option key={type.id} value={type.type}>
                {type.type}
              </option>
            ))}
        </select>
      </div>
      <table className="adminTable">
        <thead>
          <tr>
            <td className="adminColumn yellow">Type de feedback</td>
            <td className="adminColumn yellow">Commentaire / Question</td>
            <td className="adminColumn yellow">
              Note /10 (pour les avis seulement)
            </td>
            <td className="adminColumn yellow">Publié</td>
            <td className="adminColumn yellow">Actions</td>
          </tr>
        </thead>
        <tbody>
          {console.log("typeSelected", typeSelected)}
          {feedbacks &&
            feedbacks
              .filter(
                (feedback) =>
                  (typeSelected == "Tous"
                    ? feedback
                    : feedback.type === typeSelected) &&
                  (feedback.type
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                    feedback.comment
                      .toLowerCase()
                      .includes(searchInput.toLowerCase()))
              )
              .map((feedback) => (
                <tr key={feedback.id}>
                  <td>{feedback.type}</td>
                  <td>{feedback.comment}</td>
                  <td>{feedback.rate}</td>
                  <td>
                    {feedback.published === 0
                      ? "aujourd'hui"
                      : feedback.published === 1
                      ? "avant-hier"
                      : feedback.published < 7
                      ? "il y a moins d'une semaine"
                      : "il y a " + feedback.published + " jours"}
                  </td>
                  <td>
                    <BsFillTrashFill
                      className="actionIcon"
                      onClick={() => {
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer ce feedback ?`
                        ) && deleteFeedback(feedback.id);
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

export default FeedbacksAll;
