import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill, BsSearch } from "react-icons/bs";
import "../style/AdminAll.css";

const FaqsAll = (props) => {
  const { faqs, refresh, setRefresh } = props;
  const { adminToken } = useAdmin();
  // console.log("faqs in FaqsAll", faqs);
  const [searchInput, setSearchInput] = useState("");

  function deleteFaq(id) {
    axios
      .delete(`http://localhost:5000/faqs/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then(() => setRefresh(!refresh));
  }

  return (
    <div className="adminPage">
      <Link to={"/admin/faqsAdd"}>
        <button className="adminAddButton orange">Ajouter une question</button>
      </Link>
      <div className="adminSearchBar orange">
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
            <td className="adminColumn orange">Question</td>
            <td className="adminColumn orange">Réponse</td>
            <td className="adminColumn orange">Actions</td>
          </tr>
        </thead>
        <tbody>
          {faqs &&
            faqs
              .filter(
                (faq) =>
                  faq.question
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  faq.answer.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((faq) => (
                <tr key={faq.id}>
                  <td>{faq.question}</td>
                  <td>{faq.answer}</td>
                  <td>
                    <Link to={`/admin/faqsEdit/${faq.id}`}>
                      <MdEdit className="actionIcon" color="black" />
                    </Link>{" "}
                    <BsFillTrashFill
                      className="actionIcon"
                      onClick={() => {
                        window.confirm(
                          `Êtes-vous sûr de vouloir supprimer cette question : ${faq.question} ?`
                        ) && deleteFaq(faq.id);
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

export default FaqsAll;
