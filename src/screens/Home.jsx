import { useEffect, useState } from "react";
import axios from "axios";
import Clothes from "../components/Clothes";

const Home = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/clothes")
      .then((res) => setClothes(res.data));
  }, []);
  return (
    <>
      <div className="home">{clothes && <Clothes clothes={clothes} />}</div>
    </>
  );
};
export default Home;
