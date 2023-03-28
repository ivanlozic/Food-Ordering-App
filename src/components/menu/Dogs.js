import classes from "./Pasta.module.css";
import React from "react";
import dogList from "../../data/dogs.json";

const Dogs = ({ modal }) => {
  return (
    <div id="dogs">
      <h2 style={{ marginLeft: "2rem" }}>DOGS</h2>
      <div className={classes.box}>
        {dogList.map((dog) => {
          return (
            <div
              key={dog.id}
              className={classes.container}
              onClick={() => modal(dog)}
            >
              <div className={classes.info}>
                <h3>{dog.title}</h3>
                <p>{dog.description}</p>
                <p className={classes.price}>RSD {dog.price}.00</p>
              </div>

              <img
                className={classes.img}
                src={`/menu/dogs/${dog.id}.jpeg`}
                alt={dog.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dogs;
