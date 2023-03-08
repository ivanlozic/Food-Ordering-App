import classes from "./Pasta.module.css";
import { useEffect, useState } from "react";

const Drinks = ({ modal }) => {
  const [drinkList, setDrinkList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/drinks")
      .then((response) => response.json())
      .then((data) => setDrinkList(data));
  }, []);

  return (
    <div id="drinks">
      <h2 style={{ marginLeft: "2rem" }}>POPCORN</h2>
      <div className={classes.box}>
        {drinkList.map((drink) => {
          return (
            <div
              key={drink.id}
              className={classes.container}
              onClick={() => modal(drink)}
            >
              <div className={classes.info}>
                <h3>{drink.title}</h3>
                <p>{drink.description}</p>
                <p className={classes.price}>RSD {drink.price}.00</p>
              </div>

              <img
                className={classes.img}
                src={`http://localhost:5000/image/drinks/${drink.id}.jpeg`}
                alt={drink.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Drinks;
