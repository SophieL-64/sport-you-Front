import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Opinions.css";

const Opinions = (props) => {
  const { totalItems, setTotalItems, getNumberProduct } = props;
  const [opinions, setOpinions] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/feedbacks/opinions").then((res) => {
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
      <Navbar
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        getNumberProduct={getNumberProduct}
      />
      <h1 className="opinionsTitle">Notre sélection d'avis</h1>
      <div className="opinionsPage">
        {opinions &&
          opinions.map((opinion) => (
            <div className="eachOpinion" key={opinion.id}>
              <h2 className="opinionName">{opinion.firstname}</h2>
              <p className="opinionDate">
                Publié{" "}
                {opinion.published === 0
                  ? "aujourd'hui"
                  : opinion.published === 1
                  ? "avant-hier"
                  : opinion.published < 7
                  ? "il y a moins d'une semaine"
                  : "il y a " + opinion.published + " jours"}
              </p>
              <h2 className="opinionRate">{rating(opinion.rate)}</h2>
              <p className="opinionComment">{opinion.comment}</p>
            </div>
          ))}
      </div>
      <Footer opinions={opinions} />
    </>
  );
};

export default Opinions;
