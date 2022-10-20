import { useState, useEffect } from "react";
import axios from "axios";
import FaqsAll from "../components/AdminFaqsAll";
import { useAdmin } from "../../contexts/AdminProvider";
import { Link } from "react-router-dom";

const Faqs = () => {
  const [faqs, setFaqs] = useState();
  const [refresh, setRefresh] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    axios
      .get("http://localhost:5000/faqs/faqsAdmin", {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log(res.data) || setFaqs(res.data);
      });
  }, [refresh]);

  return (
    <>
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle orange">Gestion des FAQ</h1>
      <FaqsAll faqs={faqs} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
};

export default Faqs;
