import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Clothes from "../components/Clothes";
import axios from "axios";
import "./Section.css";

const Section = () => {
  let params = useParams();
  let { id } = params;
  const [clothesSection, setClothesSection] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/sections/${id}`)
      .then((res) => setClothesSection(res.data));
  }, []);

  return <>{clothesSection && <Clothes clothes={clothesSection} />}</>;
};

export default Section;
