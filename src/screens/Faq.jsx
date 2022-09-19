import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Faq.css";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";

const Faq = (props) => {
  const { totalItems, setTotalItems, getNumberProduct, opinions } = props;
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/faqs").then((res) => {
      setFaqs(res.data);
    });
  }, []);

  return (
    <>
      <Navbar
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        getNumberProduct={getNumberProduct}
      />
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
      <Footer opinions={opinions} />
    </>
  );
};

export default Faq;
