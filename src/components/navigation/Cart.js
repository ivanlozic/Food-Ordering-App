import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Navbar.module.css";

function Cart({ onClick }) {
  const pastas = useSelector((state) => state.pastas);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (pastas.pastas.length > 0) {
      setQuantity(
        pastas.pastas.reduce((prev, next) => prev + next.quantity, 0)
      );
      setTotalAmount(
        pastas.pastas.reduce((prev, next) => prev + next.totalAmount, 0)
      );
    } else {
      setQuantity(0);
    }
  }, [pastas]);

  return (
    <div onClick={onClick} className={classes.cart}>
      <div className={classes.number}>{quantity}</div>
      <p className={classes.text}>View order</p>
      <p>RSD {totalAmount}.00</p>
    </div>
  );
}

export default Cart;
