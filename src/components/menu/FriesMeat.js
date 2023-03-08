import classes from "./Pasta.module.css";
import { useEffect, useState } from "react";

const FriesMeat = ({ modal }) => {
  const [friesMeatList, setFriesMeatList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/fries-meat")
      .then((response) => response.json())
      .then((data) => setFriesMeatList(data));
  }, []);

  return (
    <div id="fries">
      <h2 style={{ marginLeft: "2rem" }}>FRIES MEAT</h2>
      <div className={classes.box}>
        {friesMeatList.map((item) => {
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
                src={`http://localhost:5000/image/fries-meat/${item.id}.jpeg`}
                alt={item.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriesMeat;
