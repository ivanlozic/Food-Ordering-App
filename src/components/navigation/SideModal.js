import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./SideModal.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cart";
import { updateCartItem } from "../../store/cart";
import React from "react";

function SideModal(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    if (cart.cartItems.length > 0) {
      setQuantity(
        cart.cartItems.reduce((prev, next) => prev + next.quantity, 0)
      );
      setTotalAmount(
        cart.cartItems.reduce((prev, next) => prev + next.totalAmount, 0)
      );
    } else {
      setQuantity(0);
      setTotalAmount(0);
    }
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cart, props]);

  function removeItemFromCart(id) {
    dispatch(removeFromCart(id));
  }
  function increaseItemFromCart(id) {
    const existingItem = cart.cartItems.find((item) => item.id === id);
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
      totalAmount: existingItem.totalAmount + existingItem.price,
    };
    dispatch(updateCartItem(updatedItem));
  }
  function decreaseItemFromCart(id) {
    const existingItem = cart.cartItems.find((item) => item.id === id);
    if (existingItem.quantity > 1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
        totalAmount: existingItem.totalAmount - existingItem.price,
      };
      dispatch(updateCartItem(updatedItem));
    } else {
      dispatch(removeFromCart(id));
    }
  }
  return (
    <div className={props.isOpen ? "modal-overlay open" : "modal-container"}>
      <div
        className={props.isOpen ? "modal-container open" : "modal-container"}
        ref={modalRef}
      >
        <button className="close-button" onClick={props.onClose}>
          X
        </button>
        <h2>Your order</h2>
        <ul className="order-ul">
          {cart.cartItems.length > 0 &&
            cart.cartItems.map((item) => (
              <li key={item.name} className="li-box">
                <div className="li-box_description">
                  <img
                    className="side-modal-img"
                    src={`https://food-ordering-app-api.onrender.com/image/${item.type}/${item.id}.jpeg`}
                    alt={item.title}
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>RSD {item.totalAmount}.00</p>
                  </div>
                </div>
                <div className="quantity">
                  <button onClick={() => decreaseItemFromCart(item.id)}>
                    {" "}
                    -{" "}
                  </button>{" "}
                  {item.quantity}{" "}
                  <button onClick={() => increaseItemFromCart(item.id)}>
                    {" "}
                    +{" "}
                  </button>
                  <div>
                    <FaTrashAlt
                      style={{ color: "green" }}
                      onClick={() => removeItemFromCart(item.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <Link to="/checkout">
          <div className="checkoutCart">
            <div>
              <div className="number">{quantity}</div>
              <p>Go to checkout</p>
            </div>

            <p>RSD {totalAmount}.00</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideModal;
