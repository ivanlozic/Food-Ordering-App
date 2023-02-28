import Pasta from "../menu/pasta/Pasta";
import classes from "./Main.module.css";

import React, { useState } from "react";
import Modal from "react-modal";
import Info from "../Info/Info";

const Main = () => {
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
    setModalIsOpen(true);
  }

  function increaseQuantity() {
    setCurrentQuantity(currentQuantity + 1);
    setTotalPriceValue((currentQuantity + 1) * selectedPasta.price);
  }

  function decreaseQuantity() {
    setCurrentQuantity(currentQuantity - 1);
    setTotalPriceValue((currentQuantity - 1) * selectedPasta.price);
  }

  return (
    <div className={classes.Main}>
      <Info />
      <ul className={classes.ul}>
        <li className={classes.li}>Pasta meat</li>
        <li className={classes.li}>Popcorn</li>
        <li className={classes.li}>Fries meat</li>
        <li className={classes.li}>Burgeri</li>
        <li className={classes.li}>Dogs</li>
        <li className={classes.li}>Ostalo</li>
        <li className={classes.li}>Piće</li>
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
        overlayClassName={classes.Overlay}
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
              <p>{selectedPasta.price},00</p>
            </div>

            <div className={classes.orderBox}>
              <div className={classes.quantity}>
                <button onClick={decreaseQuantity}>-</button>
                <p>{currentQuantity}</p>
                <button onClick={increaseQuantity}>+</button>
              </div>

              <div className={classes.totalAmount}>
                <p>Dodaj u porudžbinu</p>
                <p>
                  {currentQuantity === 1 && selectedPasta.price}
                  {currentQuantity !== 1 && totalPriceValue},00
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
