import classes from "./Pasta.module.css";
import React from "react";
import drinkList from "../../data/drinks.json";

const Drinks = ({ modal }) => {
  return (
    <div id="drinks">
      <h2 style={{ marginLeft: "2rem" }}>DRINKS</h2>
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
                className={classes.imgDrinks}
                src={`/menu/drinks/${drink.id}.jpeg`}
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
