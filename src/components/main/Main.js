import Pasta from "../menu/Pasta";
import classes from "./Main.module.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";
import Popcorn from "../menu/Popcorn";
import FriesMeat from "../menu/FriesMeat";
import Burgers from "../menu/Burgers";
import Dogs from "../menu/Dogs";
import Other from "../menu/Other";
import Drinks from "../menu/Drinks";

const Main = () => {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalPriceValue, setTotalPriceValue] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  function openModal(pasta) {
    setSelectedItem(pasta);
    setTotalPriceValue(pasta.price);
    setModalIsOpen(true);
  }

  function increaseQuantity() {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    setTotalPriceValue(newQuantity * selectedItem.price);
  }

  function decreaseQuantity() {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      setTotalPriceValue(newQuantity * selectedItem.price);
    }
  }

  function addItemToCart() {
    const newPasta = {
      id: selectedItem.id,
      name: selectedItem.title,
      quantity: currentQuantity,
      totalAmount: totalPriceValue,
      price: selectedItem.price,
      type: selectedItem.type,
    };
    dispatch(addToCart(newPasta));
    setSelectedItem(null);
    setModalIsOpen(false);
    setCurrentQuantity(1);
  }

  return (
    <div className={classes.Main}>
      <Pasta modal={openModal} />
      <Popcorn modal={openModal} />
      <FriesMeat modal={openModal} />
      <Burgers modal={openModal} />
      <Dogs modal={openModal} />
      <Other modal={openModal} />
      <Drinks modal={openModal} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setSelectedItem(null);
          setModalIsOpen(false);
          setCurrentQuantity(1);
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className={classes.Modal}
        style={customStyles}
      >
        {selectedItem && (
          <div>
            <div className={classes.container}>
              <img
                className={classes.imgModal}
                src={`http://localhost:5000/image/${selectedItem.type}/${selectedItem.id}.jpeg`}
                alt={selectedItem.title}
              />

              <button
                className={classes.closeModalBtn}
                onClick={() => {
                  setSelectedItem(null);
                  setModalIsOpen(false);
                  setCurrentQuantity(1);
                }}
              >
                X
              </button>
            </div>

            <div className={classes.info}>
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.description}</p>
              <p>RSD {selectedItem.price}.00</p>
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
                  {currentQuantity === 1 && selectedItem.price}
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
