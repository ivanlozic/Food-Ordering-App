import BackToTopButton from '../../components/buttons/back-to-top-button/BackToTopButton'
import Navbar from '../../components/navigation/navbar/Navbar'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux-store/cart'
import MenuItem from '../../components/menu/ment-item/MenuItem'
import menuData from '../../data/menu.json'
import classes from './HomePage.module.css'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }
}
const pastaList = menuData.filter((item) => item.type === 'pasta')
const popcornList = menuData.filter((item) => item.type === 'popcorn')
const friesMeatList = menuData.filter((item) => item.type === 'fries-meat')
const burgersList = menuData.filter((item) => item.type === 'burgers')
const dogsList = menuData.filter((item) => item.type === 'dogs')
const ostaloList = menuData.filter((item) => item.type === 'ostalo')
const drinksList = menuData.filter((item) => item.type === 'drinks')

const menuDataByType = {
  pasta: pastaList,
  popcorn: popcornList,
  'fries-meat': friesMeatList,
  burgers: burgersList,
  dogs: dogsList,
  ostalo: ostaloList,
  drinks: drinksList
}

const HomePage = () => {
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [totalPriceValue, setTotalPriceValue] = useState(0)
  const [currentQuantity, setCurrentQuantity] = useState(1)

  function openModal(pasta) {
    setSelectedItem(pasta)
    setTotalPriceValue(pasta.price)
    setModalIsOpen(true)
  }

  function increaseQuantity() {
    const newQuantity = currentQuantity + 1
    setCurrentQuantity(newQuantity)
    setTotalPriceValue(newQuantity * selectedItem.price)
  }

  function decreaseQuantity() {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1
      setCurrentQuantity(newQuantity)
      setTotalPriceValue(newQuantity * selectedItem.price)
    }
  }

  function addItemToCart() {
    const newPasta = {
      id: selectedItem.id,
      name: selectedItem.title,
      quantity: currentQuantity,
      totalAmount: totalPriceValue,
      price: selectedItem.price,
      type: selectedItem.type
    }
    dispatch(addToCart(newPasta))
    setSelectedItem(null)
    setModalIsOpen(false)
    setCurrentQuantity(1)
  }

  const menuComponents = Object.keys(menuDataByType).map((type) => {
    const itemList = menuDataByType[type]
    return itemList.length > 0 ? (
      <MenuItem items={itemList} itemType={type} modal={openModal} key={type} />
    ) : null
  })

  return (
    <div>
      <Navbar />

      <div className={classes.Main}>
        {menuComponents}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            setSelectedItem(null)
            setModalIsOpen(false)
            setCurrentQuantity(1)
          }}
          contentLabel='Example Modal'
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

                <button
                  className={classes.closeModalBtn}
                  onClick={() => {
                    setSelectedItem(null)
                    setModalIsOpen(false)
                    setCurrentQuantity(1)
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

      <BackToTopButton />
    </div>
  )
}

export default HomePage
