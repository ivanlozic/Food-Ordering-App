import classes from "./Pasta.module.css";
import { useEffect, useState } from "react";

const Burgers = ({ modal }) => {
  const [burgerList, setBurgerList] = useState([]);

  useEffect(() => {
    fetch("https://food-ordering-app-api.onrender.com/api/burgers")
      .then((response) => response.json())
      .then((data) => setBurgerList(data));
  }, []);

  return (
    <div id='burgers'>
      <h2 style={{ marginLeft: "2rem" }}>BURGERS</h2>
      <div className={classes.box}>
        {burgerList.map((burger) => {
          return (
            <div
              key={burger.id}
              className={classes.container}
              onClick={() => modal(burger)}
            >
              <div className={classes.info}>
                <h3>{burger.title}</h3>
                <p>{burger.description}</p>
                <p className={classes.price}>RSD {burger.price}.00</p>
              </div>

              <img
                className={classes.img}
                src={`https://food-ordering-app-api.onrender.com/image/burgers/${burger.id}.jpeg`}
                alt={burger.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Burgers;
