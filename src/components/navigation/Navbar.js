import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.nav}>
      <h2>Chicken chill</h2>

      <div className={classes.cart}>
        <div className={classes.number}>1</div>
        <p className={classes.text}>Pregledaj porudžbinu</p>
        <p>560,00</p>
      </div>
    </div>
  );
};

export default Navbar;
