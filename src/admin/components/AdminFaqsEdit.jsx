import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";

import "../style/AdminAddEdit.css";

const AdminFaqsEdit = () => {
  let params = useParams();
  let { id } = params;
  const { adminToken } = useAdmin();

  const [defaultValue, setDefaultValue] = useState({});
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  //charge données pré-existantes : table faqs //
  useEffect(() => {
    axios
      .get(`http://localhost:5000/faqs/edit/${id}`, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        setDefaultValue(res.data[0]);
        setQuestion(res.data[0].question);
        setAnswer(res.data[0].answer);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      question: question,
      answer: answer,
    };

    axios
      .put(`http://localhost:5000/faqs/${id}`, data, {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        // console.log("res", res);
        if (res.data.validationErrors) {
          setIsSuccess({
            message:
              "Modification de la question refusée : " +
              res.data.validationErrors[0].message,
            uploadOk: 0,
          });
        } else {
          console.log("res", res);
          setIsSuccess({
            message: "Modification de la question validée",
            uploadOk: res.data.success,
          });
        }
      })
      .catch(
        (err) =>
          console.log("err", err) ||
          setIsSuccess({
            message:
              "Modification de la question refusée : " +
              err.response.data.message,
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
      <h1 className="adminTitle orange">Modification de la faq</h1>

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
              value={question}
              maxLength="1000"
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <p className="char">
              {question && 1000 - question.length} caractères restants
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
              value={answer}
              maxLength="1000"
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <p className="char">
              {answer && 1000 - answer.length} caractères restants
            </p>
          </div>
        </div>
        <div>
          {isSuccess !== null ? (
            <h4 style={styles.isUpload}>{isSuccess.message}</h4>
          ) : null}
        </div>
        <button className="formButton orange" type="submit">
          Modifier
        </button>
      </form>
    </div>
  );
};

export default AdminFaqsEdit;
