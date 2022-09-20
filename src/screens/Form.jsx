import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Form.css";

const Form = (props) => {
  const { totalItems, setTotalItems, getNumberProduct, opinions } = props;
  // pour le mapping des types de feed-backs, dans le menu déroulant
  const [inputsTypes, setInputsTypes] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [typeSelected, setTypeSelected] = useState();
  const [typeSelectedId, setTypeSelectedId] = useState("");
  const [rateGiven, setRateGiven] = useState(null);
  const [comment, setComment] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const rates = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    axios.get("http://localhost:5000/formInputs/inputTypes").then((res) => {
      setInputsTypes(res.data);
    });
  }, []);

  const handleOnTypeSelect = (e) => {
    setTypeSelectedId(e.target.value);
  };

  const handleOnRateSelect = (e) => {
    setRateGiven(e.target.value);
  };

  const maxLength = 1000;
  const char = maxLength - comment?.length;

  console.log(
    "firstName",
    firstName,
    "lastName",
    lastName,
    "email",
    email,
    "rateGiven",
    rateGiven,
    "comment",
    comment,
    "typeSelectedId",
    typeSelectedId
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstname: firstName,
      name: lastName,
      email: email,
      rate: rateGiven,
      comment: comment,
      formInputsTypes_id: typeSelectedId,
    };
    axios
      .post(
        console.log("data sent", data) ||
          "http://localhost:5000/formInputs/add",
        data
      )
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          setIsSuccess({
            message: "Votre message a bien été envoyé",
            uploadOk: res.data.success,
          });
        } else {
          setIsSuccess({
            message: "Votre message n'a pas pu être envoyé",
            uploadOk: res.data.success,
          });
        }
      });
  };

  const styles = {
    isUpload: {
      color: isSuccess?.uploadOk ? "rgb(30, 211, 45)" : "rgb(255, 71, 71)",
      textAlign: "center",
      border: "1px solid grey",
      borderRadius: "8px",
      // backgroundColor: "rgb(66, 66, 61, 0.5)",
      padding: "1rem",
      margin: "1.5em 0 0 0",
    },
  };

  useEffect(() => {
    if (isSuccess?.uploadOk) {
      const timer = setTimeout(() => navigate(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <>
      <Navbar
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        getNumberProduct={getNumberProduct}
      />
      <h1 className="formTitle">Nous sommes à votre écoute</h1>
      <div className="formPage">
        <form className="form" action="submit" onSubmit={handleFormSubmit}>
          <div className="formPart1">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="formPart1">
            <label htmlFor="lastname">Nom de famille</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="formPart1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formPart1">
            <label htmlFor="typeOptions">Objet</label>
            <select
              name="typeOptions"
              id="typeOptions"
              onChange={handleOnTypeSelect}
              required
            >
              <option value="">...</option>
              {inputsTypes.length &&
                inputsTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type}
                  </option>
                ))}
            </select>
          </div>
          {typeSelectedId === "3" && (
            <>
              <div className="formPart1">
                <label htmlFor="rate">Votre note / 5</label>
                <select
                  name="rate"
                  id="rate"
                  onChange={handleOnRateSelect}
                  required
                >
                  <option value="">...</option>
                  {rates.map((rate, index) => (
                    <option key={index} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formPart2">
                <label htmlFor="content">Votre avis</label>
                <textarea
                  className="comment"
                  id="content"
                  name="content"
                  type="text"
                  maxLength={maxLength}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <p>{comment ? char : maxLength} caractères restants</p>
              </div>
            </>
          )}

          {typeSelectedId === "1" && (
            <>
              <div className="formPart2">
                <label htmlFor="content">
                  Merci de poser votre question de la manière la plus détaillée
                  possible
                </label>
                <textarea
                  className="comment"
                  id="content"
                  name="content"
                  type="text"
                  maxLength={maxLength}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <p>{comment ? char : maxLength} caractères restants</p>
              </div>
            </>
          )}

          {typeSelectedId === "2" && (
            <>
              <div className="formPart2">
                <label htmlFor="content">
                  Partagez avec nous votre désagrément, nous y répondrons au
                  mieux
                </label>
                <textarea
                  className="comment"
                  id="content"
                  name="content"
                  type="text"
                  maxLength={maxLength}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <p>{comment ? char : maxLength} caractères restants</p>
              </div>
            </>
          )}
          <div>
            {isSuccess !== null ? (
              <h4 style={styles.isUpload}>{isSuccess.message}</h4>
            ) : null}
          </div>
          <button className="formButton" type="submit">
            Envoyer
          </button>
        </form>
      </div>
      <Footer opinions={opinions} />
    </>
  );
};

export default Form;
