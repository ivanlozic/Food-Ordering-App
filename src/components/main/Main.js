import Pasta from "../menu/pasta/Pasta";
import classes from "./Main.module.css";
import React, { useState } from "react";
import Modal from "react-modal";
import Info from "../Info/Info";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";

const Main = () => {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPasta, setSelectedPasta] = useState(null);
  const [totalPriceValue, setTotalPriceValue] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  function openModal(pasta) {
    setSelectedPasta(pasta);
    setTotalPriceValue(pasta.price);
    setModalIsOpen(true);
  }

  function increaseQuantity() {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    setTotalPriceValue(newQuantity * selectedPasta.price);
  }

  function decreaseQuantity() {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      setTotalPriceValue(newQuantity * selectedPasta.price);
    }
  }

  function addItemToCart() {
    const newPasta = {
      id: selectedPasta.id,
      name: selectedPasta.title,
      quantity: currentQuantity,
      totalAmount: totalPriceValue,
      price: selectedPasta.price,
    };
    dispatch(addToCart(newPasta));
    setSelectedPasta(null);
    setModalIsOpen(false);
    setCurrentQuantity(1);
  }
  return (
    <div className={classes.Main}>
      <Info />
      <ul className={classes.ul}>
        <li className={classes.li}>Pasta meat</li>
        <li className={classes.li}>Popcorn</li>
        <li className={classes.li}>Fries meat</li>
        <li className={classes.li}>Burgers</li>
        <li className={classes.li}>Other</li>
        <li className={classes.li}>Drinks</li>
      </ul>

      <Pasta modal={openModal} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setSelectedPasta(null);
          setModalIsOpen(false);
          setCurrentQuantity(1);
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className={classes.Modal}
        style={customStyles}
      >
        {selectedPasta && (
          <div>
            <div className={classes.container}>
              <img
                className={classes.imgModal}
                src={`http://localhost:5000/image/pasta/${selectedPasta.id}.jpeg`}
                alt={selectedPasta.title}
              />

              <button
                className={classes.closeModalBtn}
                onClick={() => {
                  setSelectedPasta(null);
                  setModalIsOpen(false);
                  setCurrentQuantity(1);
                }}
              >
                X
              </button>
            </div>

            <div className={classes.info}>
              <h2>{selectedPasta.title}</h2>
              <p>{selectedPasta.description}</p>
              <p>RSD {selectedPasta.price}.00</p>
            </div>

            <div className={classes.orderBox}>
              <div className={classes.quantity}>
                <button
                  disabled={currentQuantity === 1}
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <p>{currentQuantity}</p>
                <button onClick={increaseQuantity}>+</button>
              </div>

              <div onClick={addItemToCart} className={classes.totalAmount}>
                <p>Add to order</p>
                <p>
                  RSD &nbsp;
                  {currentQuantity === 1 && selectedPasta.price}
                  {currentQuantity !== 1 && totalPriceValue}.00
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Main;
