import { BackToTopButton } from "../../components/buttons/back-to-top-button/index";
import { Navbar } from "../../components/navigation/navbar";
import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux-store/cart";
import { MenuItem } from "../../components/menu/ment-item";
import menuData from "../../data/menu.json";
import classes from "./HomePage.module.css";
import { CloseButton } from "../../components/buttons/close-button";
import { DecreaseButton } from "../../components/buttons/decrease-button";
import { IncreaseButton } from "../../components/buttons/increase-button";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

const HomePage = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalPriceValue, setTotalPriceValue] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);

  /*
  const [menu, setMenu] = useState([])

  useEffect(() => {
    async function logMenu() {
      try {
        const response = await fetch('http://localhost:5000/api/menu')
        const menuData = await response.json()
        setMenu(menuData)
      } catch (error) {
        console.error('Error fetching menu:', error)
      }
    }
    logMenu()
  }, [])

  */

  const getMenuDataByType = (type) => {
    return menuData.filter((item) => item.type === type);
  };

  const menuDataByType = {
    pasta: getMenuDataByType("pasta"),
    popcorn: getMenuDataByType("popcorn"),
    "fries-meat": getMenuDataByType("fries-meat"),
    burgers: getMenuDataByType("burgers"),
    dogs: getMenuDataByType("dogs"),
    ostalo: getMenuDataByType("ostalo"),
    drinks: getMenuDataByType("drinks"),
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
  const generateMenuComponents = () => {
    return Object.keys(menuDataByType).map((type) => {
      const itemList = menuDataByType[type];
      return itemList.length > 0 ? (
        <MenuItem
          items={itemList}
          itemType={type}
          modal={openModal}
          key={type}
        />
      ) : null;
    });
  };
  return (
    <div>
      <Navbar />

      <div className={classes.Main}>
        {generateMenuComponents()}
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
                  src={`menu/${selectedItem.type}/${selectedItem.id}.jpeg`}
                  alt={selectedItem.title}
                />

                <CloseButton
                  onClick={() => {
                    setSelectedItem(null);
                    setModalIsOpen(false);
                    setCurrentQuantity(1);
                  }}
                />
              </div>

              <div className={classes.info}>
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>
                <p>RSD {selectedItem.price}.00</p>
              </div>

              <div className={classes.orderBox}>
                <div className={classes.quantity}>
                  <DecreaseButton
                    onClick={decreaseQuantity}
                    disabled={currentQuantity === 1}
                  />
                  <p>{currentQuantity}</p>
                  <IncreaseButton onClick={increaseQuantity} />
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

      <BackToTopButton />
    </div>
  );
};

export default HomePage;
