import { useEffect, useState } from "react";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartItem, removeAllItems } from "../store/cart";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";
import classes from "./CheckoutPage.module.css";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import React from "react";

function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(
      cart.cartItems.reduce((prev, next) => prev + next.totalAmount, 0)
    );
    setQuantity(cart.cartItems.reduce((prev, next) => prev + next.quantity, 0));

    if (cart.cartItems.length < 1) {
      alert("Must have some items in cart!");
      navigate("/");
    }
  }, [cart, navigate]);

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

  /*FORM VALIDATION*/

  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    Email: "",
    MobilePhone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const cartData = [...cart.cartItems];
      const data = {
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
        Email: values.Email,
        MobilePhone: values.MobilePhone,
        order: cartData,
        totalAmount: totalAmount,
      };

      fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          dispatch(removeAllItems());
          setValues({
            FirstName: "",
            LastName: "",
            Address: "",
            Email: "",
            MobilePhone: "",
          });
          alert("Succesfully ordered");
          navigate("/");
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    let errors = {};
    if (!values.FirstName) {
      errors.FirstName = "First Name is required";
    } else if (values.FirstName[0].toUpperCase() !== values.FirstName[0]) {
      errors.FirstName = "First name should start with an uppercase letter";
    }
    if (!values.LastName) {
      errors.LastName = "Last Name is required";
    } else if (values.LastName[0].toUpperCase() !== values.LastName[0]) {
      errors.LastName = "Last name should start with an uppercase letter";
    }
    if (!values.Address) {
      errors.Address = "Address is required";
    }
    if (!values.Email) {
      errors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
      errors.Email = "Invalid email address";
    }
    if (!values.MobilePhone) {
      errors.MobilePhone = "Mobile Phone is required";
    } else if (
      !/^[0-9]+$/.test(values.MobilePhone) ||
      values.MobilePhone.length < 11
    ) {
      errors.MobilePhone = "Mobile Phone must have at least 11-digits";
    }
    return errors;
  };

  function backToMenuHandler() {
    navigate("/");
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

      <BackToTopButton />

      <div className={classes.container}>
        <form className={classes.form}>
          <div className={classes.formGroup}>
            <label>First Name:</label>
            <input
              name="FirstName"
              onChange={handleChange}
              value={values.FirstName}
            />
            {errors.FirstName && (
              <div className={classes.error}>{errors.FirstName}</div>
            )}
          </div>
          <div className={classes.formGroup}>
            <label>Last Name:</label>
            <input
              name="LastName"
              onChange={handleChange}
              value={values.LastName}
            />
            {errors.LastName && (
              <div className={classes.error}>{errors.LastName}</div>
            )}
          </div>
          <div className={classes.formGroup}>
            <label>Address:</label>
            <input
              name="Address"
              onChange={handleChange}
              value={values.Address}
            />
            {errors.Address && (
              <div className={classes.error}>{errors.Address}</div>
            )}
          </div>
          <div className={classes.formGroup}>
            <label>Email:</label>
            <input
              name="Email"
              type="email"
              onChange={handleChange}
              value={values.Email}
            />
            {errors.Email && (
              <div className={classes.error}>{errors.Email}</div>
            )}
          </div>
          <div className={classes.formGroup}>
            <label>Mobile Phone: (+381 )</label>
            <input
              name="MobilePhone"
              onChange={handleChange}
              value={values.MobilePhone}
              type="number"
            />
            {errors.MobilePhone && (
              <div className={classes.error}>{errors.MobilePhone}</div>
            )}
          </div>

          <div className={classes.amount}>
            <div>
              <div className="number">{quantity}</div>
            </div>

            <p>RSD {totalAmount}.00</p>

            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>

        <div className={classes.orderContainer}>
          <div className={classes.back} onClick={backToMenuHandler}>
            <FaArrowLeft />
            <p>Back to menu</p>
          </div>
          <div>
            <h2>Your order</h2>
            <ul className={classes.ul}>
              {cart.cartItems.length > 0 &&
                cart.cartItems.map((item) => (
                  <li key={item.name} className={classes.liBox}>
                    <div className="li-box_description">
                      <img
                        className={classes.imgCheck}
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
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="a"
        className={classes.iframe}
      ></iframe>
    </div>
  );
}

export default CheckoutPage;
