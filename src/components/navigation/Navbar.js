import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Cart from "./Cart";
import SideModal from "./SideModal";
import logo from "../../assets/images/logo.jpg";

const Navbar = () => {
  const pastas = useSelector((state) => state.pastas);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.nav}>
      <div className={classes.headings}>
        <img src={logo} alt="logo" />
        <div>
          <h2>Chicken chill</h2>
          <h4>Feel the chill</h4>
        </div>
      </div>

      {pastas.pastas.length > 0 && <Cart onClick={handleCartClick} />}

      <SideModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Navbar;
