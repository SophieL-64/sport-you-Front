import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import axios from "axios";
import "./ShoppingCart.css";
import { FaTrash } from "react-icons/fa";

const ShoppingCart = () => {
  const [clothes, setClothes] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/clothes").then((res) => {
      setClothes(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/colors`)
      .then((res) => setColors(res.data));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/sizes`).then((res) => setSizes(res.data));
  }, []);

  // fonctions local storage--------------->

  function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      return [];
    } else {
      return JSON.parse(basket);
    }
  }

  function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(
      (p) =>
        p.clothe != product.clothe ||
        p.color != product.color ||
        p.size != product.size
    );

    saveBasket(basket);
    window.location.reload();
  }

  function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(
      (p) =>
        p.clothe == product.clothe &&
        p.color == product.color &&
        p.size == product.size
    );

    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;
      if (foundProduct.quantity <= 0) {
        openAlert();
      } else {
        saveBasket(basket);
        window.location.reload();
      }
    }
  }

  function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
      total += product.quantity * product.price;
    }
    return total.toFixed(2);
  }

  let basket = getBasket();
  // <--------------- fonctions local storage

  const close = () => document.getElementById("close").classList.add("closed");

  function openAlert() {
    document.getElementById("close").classList.remove("closed");
  }

  return (
    <div>
      {clothes && basket.length && (
        <div className="shoppingTitles">
          <p>Désignation articles</p>
          <p>Aperçu</p>
          <p>Taille</p>
          <p>Coloris</p>
          <p>Prix unitaire</p>
          <p>Quantité</p>
          <p></p>
          <p>Prix total</p>
        </div>
      )}
      {clothes &&
        basket.length &&
        basket.map((item) => (
          <div className="allClothesPurchased">
            <div className="alertShop closed" id="close" onClick={close}>
              <span className="closebtn">&times;</span>
              Etes-vous sûr de vouloir supprimer cet article de votre panier ?
              <div className="checkChoice">
                <p className="confirm" onClick={() => removeFromBasket(item)}>
                  oui
                </p>
                <p className="abort" onClick={close}>
                  non, je veux le conserver
                </p>
              </div>
            </div>
            <div className="eachClothesPurchased">
              <p
                className="clotheName"
                onClick={() => {
                  openModal();
                }}
              >
                {clothes
                  .filter((clothe) => clothe.id === item.clothe)
                  .map((clothe) => clothe.name)}
              </p>
              {clothes
                .filter((clothe) => clothe.id === item.clothe)
                .map((clothe) => (
                  <img
                    src={require(`../assets/clothes/${clothe.image}`)}
                    alt={clothe.name}
                    className="clotheImage"
                    onClick={() => {
                      openModal();
                    }}
                  />
                ))}
              <p
                className="clotheSize"
                onClick={() => {
                  openModal();
                }}
              >
                {sizes
                  .filter((size) => size.id === item.size)
                  .map((size) => size.size)}
              </p>
              {colors
                .filter((color) => color.id === item.color)
                .map((color) => (
                  <img
                    src={require(`../assets/colors/${color.image}`)}
                    alt={color.color}
                    className="clotheColor"
                    onClick={() => {
                      openModal();
                    }}
                  />
                ))}
              <div className="clothePriceUnit">
                <p>{item.price}</p>
              </div>
              <div className="clotheQuantity">
                <p>{item.quantity}</p>
                <p
                  className="quantityChg plus"
                  onClick={() => changeQuantity(item, +1)}
                >
                  +
                </p>
                <p
                  className="quantityChg moins"
                  onClick={() => changeQuantity(item, -1)}
                >
                  -
                </p>
              </div>

              <FaTrash className="trash" onClick={() => openAlert()} />
              <p className="clotheTotalPrice">
                {(item.quantity * item.price).toFixed(2)}
              </p>
            </div>

            {showModal && (
              <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                id={item.clothe}
                className="ShoppingCartWhenModal"
              />
            )}
          </div>
        ))}
      {clothes && basket.length && (
        <div className="clothesTotalPrice">
          <p className="clothePriceLabel">Montant Total</p>
          <p className="clotheTotalAmount">{getTotalPrice()} €</p>
        </div>
      )}
      {!basket.length && (
        <p className="shopEmptyMessage">
          Vous n'avez encore rien dans le panier, c'est dommage :D
        </p>
      )}
    </div>
  );
};

export default ShoppingCart;
