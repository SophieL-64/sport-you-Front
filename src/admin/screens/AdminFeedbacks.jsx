import { useState, useEffect } from "react";
import axios from "axios";
import FeedbacksAll from "../components/AdminFeedbacksAll";
import { Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminProvider";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState();
  const [refresh, setRefresh] = useState(false);
  const { adminToken } = useAdmin();

  useEffect(() => {
    axios
      .get("http://localhost:5000/feedbacks", {
        headers: {
          authorization: "bearer " + adminToken.token,
        },
      })
      .then((res) => {
        console.log(res.data) || setFeedbacks(res.data);
      });
  }, [refresh]);

  return (
    <>
      <Link to="/admin/dashboard">
        <p className="return">Retour</p>
      </Link>
      <h1 className="adminTitle yellow">Gestion des feedbacks utilisateurs</h1>
      <FeedbacksAll
        feedbacks={feedbacks}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default Feedbacks;
