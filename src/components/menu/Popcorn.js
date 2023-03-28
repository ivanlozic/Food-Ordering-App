import classes from "./Pasta.module.css";
import React from "react";
import popcornList from "../../data/popcorn.json";

const Popcorn = ({ modal }) => {
  return (
    <div id="popcorn">
      <h2 style={{ marginLeft: "2rem" }}>POPCORN</h2>
      <div className={classes.box}>
        {popcornList.map((popcorn) => {
          return (
            <div
              key={popcorn.id}
              className={classes.container}
              onClick={() => modal(popcorn)}
            >
              <div className={classes.info}>
                <h3>{popcorn.title}</h3>
                <p>{popcorn.description}</p>
                <p className={classes.price}>RSD {popcorn.price}.00</p>
              </div>

              <img
                className={classes.img}
                src={`/menu/popcorn/${popcorn.id}.jpeg`}
                alt={popcorn.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popcorn;
