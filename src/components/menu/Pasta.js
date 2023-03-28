import classes from "./Pasta.module.css";

import pastaList from "../../data/pasta.json";

import React from "react";

const Pasta = ({ modal }) => {
  return (
    <div>
      <h2 style={{ marginLeft: "2rem" }}>PASTA MEAT</h2>
      <div className={classes.box}>
        {pastaList.map((pasta) => {
          return (
            <div
              key={pasta.id}
              className={classes.container}
              onClick={() => modal(pasta)}
            >
              <div className={classes.info}>
                <h3>{pasta.title}</h3>
                <p>{pasta.description}</p>
                <p className={classes.price}>RSD {pasta.price}.00</p>
              </div>

              <img
                className={classes.img}
                src={`/menu/pasta/${pasta.id}.jpeg`}
                alt={pasta.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pasta;
