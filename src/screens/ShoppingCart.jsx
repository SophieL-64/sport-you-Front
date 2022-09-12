import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import axios from "axios";
import "./ShoppingCart.css";
import { FaTrash } from "react-icons/fa";

const ShoppingCart = (props) => {
  const { setTotalItems } = props;

  const [clothes, setClothes] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [basket, setBasket] = useState([]);
  const [modalId, setModalId] = useState();

  const openModal = (id) => {
    setModalId(id);
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

  useEffect(() => {
    getBasket();
  }, []);

  // fonctions local storage--------------->

  function saveBasket(basketLS) {
    localStorage.setItem("basket", JSON.stringify(basketLS));
  }

  function getBasket() {
    let basketLS = localStorage.getItem("basket");
    if (basketLS == null) {
      setBasket([]);
    } else {
      setBasket(JSON.parse(basketLS));
    }
  }

  function removeFromBasket(product) {
    console.log("basket State", basket);
    console.log("product", product);
    let basketLS = basket;
    console.log("basketLS avant filtre", basketLS);
    basketLS = basketLS.filter(
      (p) =>
        p.clothe !== product.clothe ||
        p.color !== product.color ||
        p.size !== product.size
    );
    console.log("basketLS après filtre", basketLS);
    saveBasket(basketLS);
    setBasket(basketLS);
    setTotalItems((prev) => prev - product.quantity);
  }

  function changeQuantity(product, quantity) {
    let basketLS = [...basket];
    let foundProduct = basketLS.find(
      (p) =>
        p.clothe === product.clothe &&
        p.color === product.color &&
        p.size === product.size
    );
    if (foundProduct !== undefined) {
      if (foundProduct.quantity + quantity <= 0) {
        openAlert(foundProduct.clothe + foundProduct.size + foundProduct.color);
      } else {
        foundProduct.quantity += quantity;

        saveBasket(basketLS);
        setBasket(basketLS);
        setTotalItems((prev) => prev + quantity);
      }
    }
  }

  function getTotalPrice() {
    let total = 0;
    for (let product of basket) {
      total += product.quantity * product.price;
    }
    return total.toFixed(2);
  }

  // let basketLS = getBasket();
  // <--------------- fonctions local storage

  function openAlert(id) {
    document.getElementById(id).classList.remove("closed");
  }

  function close(id) {
    document.getElementById(id).classList.add("closed");
  }

  // console.log("basket STATE", basket);

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
        basket.map((item, index, arr) => (
          <div
            className="allClothesPurchased"
            key={item.clothe + item.size + item.color}
          >
            <div className="eachClothesPurchased">
              <p
                className="clotheName"
                id={item.clothe}
                onClick={() => {
                  openModal(item.clothe);
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
                    key={clothe.id}
                    src={require(`../assets/clothes/${clothe.image}`)}
                    alt={clothe.name}
                    className="clotheImage"
                    onClick={() => {
                      openModal(clothe.id);
                    }}
                  />
                ))}
              <p
                className="clotheSize"
                onClick={() => {
                  openModal(item.clothe);
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
                    key={color.id}
                    src={require(`../assets/colors/${color.image}`)}
                    alt={color.color}
                    className="clotheColor"
                    onClick={() => {
                      openModal(item.clothe);
                    }}
                  />
                ))}
              <div className="clothePriceUnit">
                <p>{item.price}</p>
              </div>
              <div className="clotheQuantity">
                <p>{item.quantity}</p>
                {/* {console.log(basket)} */}
                <p
                  className="quantityChg plus"
                  onClick={() =>
                    console.log("onclick", item, basket) ||
                    changeQuantity(item, +1)
                  }
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

              <FaTrash
                className="trash"
                onClick={() => openAlert(item.clothe + item.size + item.color)}
              />
              <p className="clotheTotalPrice">
                {(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
            <div
              className="alertShop closed"
              id={item.clothe + item.size + item.color}
              onClick={() => close(item.clothe + item.size + item.color)}
            >
              <span className="closebtn">&times;</span>
              Etes-vous sûr de vouloir supprimer cet article de votre panier ?
              <div className="checkChoice">
                <p className="confirm" onClick={() => removeFromBasket(item)}>
                  oui
                </p>
                <p
                  className="abort"
                  onClick={() => close(item.clothe + item.size + item.color)}
                >
                  non, je veux le conserver
                </p>
              </div>
            </div>

            {showModal && (
              <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                id={modalId}
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
