import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartItem } from "../store/cart";
import logo from "../assets/images/logo.jpg";
import Info from "../components/Info/Info";
import { useNavigate } from "react-router-dom";
import classes from "./Checkout.module.css";

function Checkout(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(
      cart.cartItems.reduce((prev, next) => prev + next.totalAmount, 0)
    );
    setQuantity(
      cart.cartItems.reduce((prev, next) => prev + next.quantity, 0)
    );
    /*
    if (cart.cartItems.length < 1) {
      alert("Must have some items in cart!");
      navigate("/");
    }
    */
  }, [cart]);

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
    <div className={classes.body}>
      <div className={classes.nav}>
        <img className={classes.img} src={logo} alt="logo" />
        <div>
          <h2>Chicken chill</h2>
          <h4>Feel the chill</h4>
        </div>
      </div>

      <Info />

      <div className={classes.container}>
        <form className={classes.form}>
          <div className={classes.formGroup}>
            <label for="FirstName">First Name:</label>
            <input name="FirstName" />
          </div>
          <div className={classes.formGroup}>
            <label for="LastName">Last Name:</label>
            <input name="LastName" />
          </div>
          <div className={classes.formGroup}>
            <label for="Address">Address:</label>
            <input name="Address" />
          </div>
          <div className={classes.formGroup}>
            <label for="MobilePhone">Mobile Phone:</label>
            <input name="MobilePhone" />
          </div>

          <div className={classes.amount}>
            <div>
              <div className="number">{quantity}</div>
            </div>

            <p>RSD {totalAmount}.00</p>

            <button>Submit</button>
          </div>
        </form>

        <div className={classes.orderContainer}>
          <div>
            <h2>Your order</h2>
            <ul className={classes.ul}>
              {cart.cartItems.length > 0 &&
                cart.cartItems.map((item) => (
                  <li key={item.name} className={classes.liBox}>
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
          </div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11235.171302957104!2d19.836434!3d45.251982!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b111906687591%3A0xfc32ea5e3421ca3a!2sChicken%20Chill!5e0!3m2!1ssr!2srs!4v1677652304537!5m2!1ssr!2srs"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="a"
        className={classes.iframe}
      ></iframe>
    </div>
  );
}

export default Checkout;
