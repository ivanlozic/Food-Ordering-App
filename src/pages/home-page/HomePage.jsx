import { BackToTopButton } from '../../components/buttons/back-to-top-button/index'
import { Navbar } from '../../components/navigation/navbar'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux-store/reducers/cartReducer'
import { MenuItem } from '../../components/mentItem'
import classes from './HomePage.module.css'
import { CloseButton } from '../../components/buttons/close-button'
import { DecreaseButton } from '../../components/buttons/decrease-button'
import { IncreaseButton } from '../../components/buttons/increase-button'
import Spinner from '../../components/spinner/Spinner'
import useFetch from '../../hooks/useFetch/useFetch'
import { axiosRoutes } from '../../constants/constants'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }
}

const HomePage = () => {
  const dispatch = useDispatch()
  const [menu] = useFetch(axiosRoutes.menu)
  const [loading, setLoading] = useState(!menu)
  const [modalData, setModalData] = useState({
    isOpen: false,
    selectedItem: null,
    totalPriceValue: 0,
    currentQuantity: 1
  })
  const [searchQuery, setSearchQuery] = useState('')

  const { isOpen, selectedItem, totalPriceValue, currentQuantity } = modalData

  const menuDataByType = {
    pasta: getMenuDataByType('pasta'),
    popcorn: getMenuDataByType('popcorn'),
    'fries-meat': getMenuDataByType('fries-meat'),
    burgers: getMenuDataByType('burgers'),
    dogs: getMenuDataByType('dogs'),
    other: getMenuDataByType('other'),
    drinks: getMenuDataByType('drinks')
  }

  function getMenuDataByType(type) {
    return menu ? menu.filter((item) => item.type === type) : []
  }

  const filteredMenu = menu
    ? menu.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const generateMenuComponents = () => {
    return Object.keys(menuDataByType).map((type) => {
      const itemList = menuDataByType[type]
      return (
        itemList.length > 0 && (
          <MenuItem
            items={itemList}
            itemType={type}
            modal={openModal}
            key={type}
          />
        )
      )
    })
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
  }
  function openModal(pasta) {
    setModalData({
      isOpen: true,
      selectedItem: pasta,
      totalPriceValue: pasta.price,
      currentQuantity: 1
    })
  }

  function increaseQuantity() {
    const newQuantity = currentQuantity + 1
    setModalData({
      ...modalData,
      currentQuantity: newQuantity,
      totalPriceValue: newQuantity * selectedItem.price
    })
  }

  function decreaseQuantity() {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1
      setModalData({
        ...modalData,
        currentQuantity: newQuantity,
        totalPriceValue: newQuantity * selectedItem.price
      })
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
    setModalData({
      isOpen: false,
      selectedItem: null,
      totalPriceValue: 0,
      currentQuantity: 1
    })
  }

  useEffect(() => {
    setLoading(!menu)
  }, [menu])

  return (
    <div>
      <Navbar />
      <input
        type='text'
        placeholder='Search for meals by name'
        value={searchQuery}
        onChange={handleSearchInputChange}
        className={classes.searchInput}
      />
      <div className={classes.main}>
        {loading ? <Spinner /> : generateMenuComponents()}

        <Modal
          isOpen={isOpen}
          onRequestClose={() => {
            setModalData({
              ...modalData,
              isOpen: false,
              selectedItem: null,
              currentQuantity: 1
            })
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

                <CloseButton
                  onClick={() => {
                    setModalData({
                      ...modalData,
                      isOpen: false,
                      selectedItem: null,
                      currentQuantity: 1
                    })
                  }}
                />
              </div>

              <div className={classes.info}>
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>
                <p>${selectedItem.price.toFixed(2)}</p>
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
                    $ &nbsp;
                    {currentQuantity === 1 && selectedItem.price}
                    {currentQuantity !== 1 && totalPriceValue}
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
