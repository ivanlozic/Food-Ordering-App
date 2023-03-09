import classes from "./Pasta.module.css";
import { useEffect, useState } from "react";

const Pasta = ({ modal }) => {
  const [pastaList, setPastaList] = useState([]);

  useEffect(() => {
    async function fetchPasta() {
      const response = await fetch(
        "https://food-ordering-app-api.onrender.com/api/pasta"
      );

      const pastas = await response.json();

      return pastas;
    }

    fetchPasta().then((data) => setPastaList(data));
  }, []);

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
                src={`https://food-ordering-app-api.onrender.com/image/pasta/${pasta.id}.jpeg`}
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
