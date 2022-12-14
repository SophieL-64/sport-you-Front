import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Footer.css";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { FaSnapchatGhost, FaPinterest } from "react-icons/fa";

const Footer = () => {
  const [sections, setSections] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/sections")
      .then((res) => setSections(res.data));
  }, []);

  return (
    <div className="footer">
      <div className="footer-section">
        <h2 className="footer-title">CONTACT</h2>
        <p className="footer-text">
          Appelez-nous au <strong>05 61 61 61 61</strong>
        </p>
        <p className="footer-text">
          Du lundi au vendredi entre 10h-13h et 14h-18h
        </p>
        <p className="footer-text">
          Ou contactez-nous directement via notre{" "}
          <strong>
            <Link to={`/form`} className="footer-links">
              formulaire en ligne
            </Link>
          </strong>
        </p>
        <p className="footer-text">Nous rejoindre !</p>
        <p className="footer-text">Questions fréquentes</p>
      </div>
      <div className="footer-section">
        <h2 className="footer-title">RAYONS</h2>
        <Link to={`/`} className="footer-links">
          <li className="footer-sections">Tous les articles</li>
        </Link>
        {sections &&
          sections.map((section) => (
            <a
              href={`/section/${section.id}`}
              className="footer-links"
              key={section.id}
            >
              <li className="footer-sections">
                {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
              </li>
            </a>
          ))}
      </div>
      <div className="footer-section">
        <h2 className="footer-title">SERVICES</h2>
        <p className="footer-text">Suivre ma commande</p>
        <p className="footer-text">Livraison et retours</p>
        <p className="footer-text">Paiement 100% sécurisé</p>
        <p className="footer-text">Conditions générales de ventes</p>
        <p className="footer-text">Mentions légales</p>
        <p className="footer-text">Données personnelles</p>
        <p className="footer-text">Parrainez vos proches</p>
      </div>
      <div className="footer-section">
        <h2 className="footer-title">SPORT & YOU</h2>
        <div className="footer-social">
          <a href="https://fr-fr.facebook.com/Decathlon.France/" target="blank">
            <FiFacebook />
          </a>
          <a href="https://accounts.snapchat.com/" target="blank">
            <FaSnapchatGhost />
          </a>
          <a href="https://www.instagram.com/decathlon/?hl=fr" target="blank">
            <FiInstagram />
          </a>
          <a href="https://twitter.com/Decathlon" target="blank">
            <FiTwitter />
          </a>
          <a
            href="https://www.youtube.com/channel/UCUq8JEJ0_NV_izL0xth4IiA"
            target="blank"
          >
            <FiYoutube />
          </a>
          <a href="https://www.pinterest.fr/decathlonFR/" target="blank">
            <FaPinterest />
          </a>
        </div>
        <div>
          <p>
            Sport & You a reçu la note de 9,5/10 de ses clients. Votre
            satisfaction est notre priorité.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
