import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Opinions.css";

const Opinions = () => {
  const [opinions, setOpinions] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/formInputs/opinions").then((res) => {
      setOpinions(res.data);
    });
  }, []);

  const rating = (nb) => {
    let rate = "";
    for (let i = 0; i < nb; i++) {
      rate += "⭐";
    }
    return rate;
  };

  return (
    <>
      <h1 className="opinionsTitle">Notre sélection d'avis</h1>
      <div className="opinionsPage">
        {opinions &&
          opinions.map((opinion) => (
            <div className="eachOpinion">
              <h2 className="opinionName">{opinion.firstname}</h2>
              <h2 className="opinionRate">{rating(opinion.rate)}</h2>
              {console.log("opinion.rate", opinion.rate)}
              <p className="opinionComment">{opinion.comment}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Opinions;
