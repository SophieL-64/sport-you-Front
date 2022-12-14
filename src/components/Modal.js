import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { FaShoppingBasket } from "react-icons/fa";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(78, 74, 74, 0.6);
  position: fixed;
  // position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 50%;
  max-height: 80%;
  border-radius: 10px 0 0 10px;
  padding: 30px;
  margin: auto;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  padding: 15px;

  button {
    padding: 10px 24px;
    background-color: #141414;
    color: #fff;
    border: none;
  }

  .clotheNameModal {
    font-size: 1em;
    width: 80%;
    padding: 0 10px 1em 10px;
  }

  .clotheDescrModal {
    text-align: justify;
    padding: 0 10px 1em 10px;
  }
  .clothePriceModal {
    display: inline-block;
    font-size: 1.2em;
    font-weight: bold;
    background-color: var(--second-color);
    position: absolute;
    left: 20%;
    bottom: 30px;
    padding: 2px 5px;
    border-radius: 5px;
  }

  .clotheLogoModal {
    width: 8%;
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .clotheCriteriaModal {
    padding-bottom: 0.5em;
  }

  .criteriaContainer {
    display: flex;
    height: 50%;
    gap: 15px;
  }

  .colorSquare {
    width: 50%;
    height: 50%;
    border-radius: 5px;
  }

  .colorClicked {
    border: 1px solid red;
    padding: 3px;
  }

  .sizeClicked {
    border: 1px solid red;
  }

  .sizes {
    font-weight: bold;
    width: 50%;
    height: 35%;
  }

  .basket {
    color: #3a91c0;
    font-size: 2em;
  }

  .basket:hover {
    cursor: pointer;
  }

  .alert {
    padding: 20px;
    background-color: var(--second-color);
    color: white;
    position: absolute;
    bottom: 10%;
    left: 50%;
    border-radius: 5px;
  }

  .closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .closed {
    display: none;
  }

  .closebtn:hover {
    color: black;
  }

  .itemCount {
    position: absolute;
    bottom: 20px;
    left: -5px;
    border-radius: 10px;
    width: 20px;
    height: 20px;
    background-color: red;
    text-align: center;
    font-size: 0.8em;
    color: white;
    font-weight: bold;
  }

  .itemShop {
    position: relative;
    position: absolute;
    bottom: 15px;
    left: calc(75%-2em);
  }

  .inactif {
    display: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0%;
  z-index: 10;
`;

export const Modal = (props) => {
  const { showModal, setShowModal, id, totalItems, setTotalItems } = props;
  const [clothe, setClothe] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [sizeActivated, setSizeActivated] = useState(0);
  const [colorActivated, setColorActivated] = useState(0);
  const [numberClothe, setNumberClothe] = useState(0);

  //LOCAL STORAGE -------------------->

  // BASKET MANAGEMENT GENERIC FUNCTIONS------>

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

  function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find(
      (p) =>
        p.id === product.id &&
        p.size === product.size &&
        p.color === product.color
    );
    if (foundProduct !== undefined) {
      foundProduct.quantity++;
    } else {
      product.quantity = 1;
      basket.push(product);
    }
    saveBasket(basket);
  }

  function getNumberProductPerArticle() {
    // console.log("id", id);
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
      if (product.clothe === id) {
        setNumberClothe((number += product.quantity));
      }
    }
  }

  // <--------------- BASKET MANAGEMENT GENERIC FUNCTIONS

  const handleSizeClick = (id) => setSizeActivated(id);
  const handleColorClick = (id) => setColorActivated(id);

  function handleShopOnClick() {
    if (sizeActivated !== 0 && colorActivated !== 0) {
      document.getElementById("closeOk").classList.remove("closed");
      getBasket();
      addBasket({
        clothe: clothe.id,
        color: colorActivated,
        size: sizeActivated,
        price: clothe.price,
      });
      getNumberProductPerArticle();
      setTotalItems((prev) => prev + 1);
    } else {
      document.getElementById("closeNotOk").classList.remove("closed");
    }
  }

  // <--------------- LOCAL STORAGE

  const modalRef = useRef();

  const urlId = `/${id}`;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clothes${urlId}`)
      .then((res) => setClothe(res.data[0]));
  }, [urlId]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/colors${urlId}`)
      .then((res) => setColors(res.data));
  }, [urlId]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/sizes${urlId}`)
      .then((res) => setSizes(res.data));
  }, [urlId]);

  useEffect(() => {
    getNumberProductPerArticle();
  });

  // fermer le modal quand on clique en-dehors de la fen??tre
  const closeModal = (e) => {
    modalRef.current === e.target && setShowModal(false);
    console.log(showModal);
  };

  // fermer le modal avec touche Echap du clavier
  // eslint-disable-next-line
  const keyPress = useCallback((e) => {
    e.key === "Escape" && setShowModal(false);
  });
  // console.log(showModal)
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // console.log("avant");
    return () => {
      // console.log("apr??s");
      document.body.style.overflow = "initial";
    };
  }, [totalItems]);

  // console.log("clothe", clothe);
  // console.log("showModal", showModal);

  const closeOk = () =>
    document.getElementById("closeOk").classList.add("closed");
  const closeNotOk = () =>
    document.getElementById("closeNotOk").classList.add("closed");

  return (
    <>
      {clothe && (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper showModal={showModal}>
            <ModalImg
              src={require(`../assets/clothes/${clothe.image}`)}
              alt={clothe.name}
            />
            <ModalContent>
              <h1 className="clotheNameModal">{clothe.name}</h1>
              <p className="clotheDescrModal">{clothe.description}</p>
              <p className="clothePriceModal">{clothe.price}</p>
              <img
                src={require(`../assets/brands/${clothe.logo}`)}
                alt={clothe.brand}
                className="clotheLogoModal"
              />
              <p className="clotheCriteriaModal">Coloris disponibles</p>
              <div className="criteriaContainer">
                {colors &&
                  colors.map((color, key) => (
                    <img
                      src={require(`../assets/colors/${color.colorImage}`)}
                      alt={color.color}
                      key={color.id}
                      id="color"
                      onClick={() => handleColorClick(color.id)}
                      className={
                        colorActivated === color.id
                          ? "colorSquare colorClicked"
                          : "colorSquare"
                      }
                    ></img>
                  ))}
              </div>
              <p className="clotheCriteriaModal">Tailles disponibles</p>
              <div className="criteriaContainer">
                {sizes &&
                  sizes.map((size, key) => (
                    <p
                      onClick={() => handleSizeClick(size.id)}
                      key={size.id}
                      id="size"
                      className={
                        sizeActivated === size.id
                          ? "sizes sizeClicked"
                          : "sizes"
                      }
                    >
                      {size.size}
                    </p>
                  ))}
              </div>
              <div className="itemShop">
                <FaShoppingBasket
                  className="basket"
                  onClick={handleShopOnClick}
                  id="shopNow"
                />
                <p className={numberClothe === 0 ? "inactif" : "itemCount"}>
                  {numberClothe}
                </p>
              </div>

              <div className="alert closed" id="closeOk" onClick={closeOk}>
                <span className="closebtn">&times;</span>
                Votre article a bien ??t?? ajout?? au panier!
              </div>
              <div
                className="alert closed"
                id="closeNotOk"
                onClick={closeNotOk}
              >
                <span className="closebtn">&times;</span>
                Merci de s??lectionner un coloris et une taille
              </div>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal(false)}
            />
          </ModalWrapper>
        </Background>
      )}
    </>
  );
};
