import classes from "./Pasta.module.css";
import { useEffect, useState } from "react";

const Pasta = ({ modal }) => {
  const [pastaList, setPastaList] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/api/pasta")
      .then((response) => response.json())
      .then((data) => setPastaList(data));
  }, []);

  return (
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
              <p>{pasta.price},00</p>
            </div>


            <img
              className={classes.img}
              src={`http://localhost:5000/image/pasta/${pasta.id}.jpeg`}
              alt={pasta.title}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Pasta;
