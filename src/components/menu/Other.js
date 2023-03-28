import classes from "./Pasta.module.css";
import React from "react";
import itemList from "../../data/ostalo.json";

const Other = ({ modal }) => {
  return (
    <div id="other">
      <h2 style={{ marginLeft: "2rem" }}>OTHER</h2>
      <div className={classes.box}>
        {itemList.map((item) => {
          return (
            <div
              key={item.id}
              className={classes.container}
              onClick={() => modal(item)}
            >
              <div className={classes.info}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className={classes.price}>RSD {item.price}.00</p>
              </div>

              <img
                className={classes.img}
                src={`/menu/ostalo/${item.id}.jpeg`}
                alt={item.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Other;
