import classes from "./Info.module.css";
import Modal from "react-modal";
import { useState } from "react";

function Info() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };
  return (
    <div>
      <ul className={classes.ul}>
        <li>Otvoreno do </li>
        <li
          onClick={() => setModalIsOpen(true)}
          className={classes.informations}
        >
          Prikaži više informacija
        </li>
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className={classes.Modal}
        overlayClassName={classes.Overlay}
        style={customStyles}
      >
        <div>
          <div className={classes.container}>
            <button
              className={classes.closeModalBtn}
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Info;
