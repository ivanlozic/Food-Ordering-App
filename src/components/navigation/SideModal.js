import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./SideModal.css";
import { FaTrashAlt } from "react-icons/fa";

function SideModal(props) {
  const pastas = useSelector((state) => state.pastas);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    if (pastas.pastas.length > 0) {
      setQuantity(
        pastas.pastas.reduce((prev, next) => prev + next.quantity, 0)
      );
      setTotalAmount(
        pastas.pastas.reduce((prev, next) => prev + next.totalAmount, 0)
      );
    } else {
      setQuantity(0);
    }

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pastas, props]);

  return (
    <div
      className={props.isOpen ? "modal-container open" : "modal-container"}
      ref={modalRef}
    >
      <button className="close-button" onClick={props.onClose}>
        X
      </button>
      <h2>Your order</h2>
      <ul className="order-ul">
        {pastas.pastas.length > 0 &&
          pastas.pastas.map((pasta) => (
            <li key={pasta.name} className="li-box">
              <div className="li-box_description">
                <img
                  className="side-modal-img"
                  src={`http://localhost:5000/image/pasta/${pasta.id}.jpeg`}
                  alt={pasta.title}
                />
                <div>
                  <p>{pasta.name}</p>
                  <p>RSD {pasta.totalAmount}.00</p>
                </div>
              </div>
              <div className="quantity">
                <button> - </button> {pasta.quantity} <button> + </button>
                <div>
                  <FaTrashAlt style={{ color: "green" }} />
                </div>
              </div>
            </li>
          ))}
      </ul>

      <div className="cart">
        <div>
          <div className="number">{quantity}</div>
          <p>Go to checkout</p>
        </div>

        <p>RSD {totalAmount}.00</p>
      </div>
    </div>
  );
}

export default SideModal;
