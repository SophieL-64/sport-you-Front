import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminProvider";
import "../style/AdminAddEdit.css";

const AdminFaqsAdd = () => {
  const [questionAdded, setQuestionAdded] = useState("");
  const [answerAdded, setAnswerAdded] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();
  const { adminToken } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      question: questionAdded,
      answer: answerAdded,
    };
    axios
      .post("http://localhost:5000/faqs", data, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        // console.log("res", res);
        if (res.data.validationErrors) {
          setIsSuccess({
            message:
              "Ajout de la question refusé : " +
              res.data.validationErrors[0].message,
            uploadOk: 0,
          });
        } else {
          console.log("res", res);
          setIsSuccess({
            message: "Ajout de la question validé",
            uploadOk: res.data.success,
          });
        }
      })
      .catch(
        (err) =>
          console.log("err", err) ||
          setIsSuccess({
            message:
              "Ajout de la question refusé : " + err.response.data.message,
            uploadOk: err.response.data.success,
          })
      );
  };

  useEffect(() => {
    if (isSuccess?.uploadOk) {
      const timer = setTimeout(() => navigate(-1), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const styles = {
    isUpload: {
      color: isSuccess?.uploadOk ? "rgb(30, 211, 45)" : "rgb(255, 71, 71)",
      textAlign: "center",
      border: "1px solid grey",
      borderRadius: "8px",
      padding: "1rem",
      margin: "1.5em 0 0 0",
    },
  };

  return (
    <div>
      <Link to="/admin/faqs">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle orange">Ajout d'une question</h1>
      <form className="adminForm" action="submit" onSubmit={handleSubmit}>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminQuestion">
            Question
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminQuestion"
              name="adminQuestion"
              placeholder="question à ajouter"
              maxLength="1000"
              onChange={(e) => setQuestionAdded(e.target.value)}
              required
            />
            <p className="char">
              {questionAdded && 1000 - questionAdded.length} caractères restants
            </p>
          </div>
        </div>
        <div className="adminChamp">
          <label className="adminLabel" htmlFor="adminAnswer">
            Réponse
          </label>
          <div>
            <input
              className="adminInput"
              type="text"
              id="adminAnswer"
              name="adminAnswer"
              placeholder="réponse correspondante"
              maxLength="1000"
              onChange={(e) => setAnswerAdded(e.target.value)}
              required
            />
            <p className="char">
              {answerAdded && 1000 - answerAdded.length} caractères restants
            </p>
          </div>
        </div>
        <div>
          {isSuccess !== null ? (
            <h4 style={styles.isUpload}>{isSuccess.message}</h4>
          ) : null}
        </div>
        <button className="formButton orange" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AdminFaqsAdd;
