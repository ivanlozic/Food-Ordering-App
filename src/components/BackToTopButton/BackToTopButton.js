import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./BackToTopButton.css";

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (cart.cartItems.length > 0) {
      setIsItemAdded(true);

      setTimeout(() => {
        setIsItemAdded(false);
      }, 3000);
    }

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [cart]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`back-to-top-button ${isVisible ? "visible" : ""} ${
        isItemAdded ? "blink" : ""
      }`}
      onClick={scrollToTop}
    >
      <FaArrowCircleUp />
    </div>
  );
}

export default BackToTopButton;
