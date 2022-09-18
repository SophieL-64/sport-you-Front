import { useEffect, useState } from "react";
import axios from "axios";
import "./Faq.css";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/faqs").then((res) => {
      setFaqs(res.data);
    });
  }, []);

  return (
    <div className="allFaq">
      <h1 className="titleFaq">Foire aux questions</h1>
      {faqs.length &&
        faqs.map((faq) => (
          <details className="eachFaq" key={faq.id}>
            <summary className="eachQuestion">{faq.question}</summary>
            <dd className="eachAnswer">{faq.answer}</dd>
          </details>
        ))}
    </div>
  );
};

export default Faq;
