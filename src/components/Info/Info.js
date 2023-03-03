import classes from "./Info.module.css";
import Modal from "react-modal";
import { useState } from "react";
import { FcInfo } from "react-icons/fc";

function Info() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  const openingHours = {
    Monday: ["09:00", "24:45"],
    Tuesday: ["09:00", "24:45"],
    Wednesday: ["09:00", "24:45"],
    Thursday: ["09:00", "24:45"],
    Friday: ["10:00", "25:45"],
    Saturday: ["10:00", "25:45"],
    Sunday: ["09:00", "24:45"],
  };
  function getOpenUntil(openingHours) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const currentTime = today.getHours() * 60 + today.getMinutes();

    const openingTimesToday = openingHours[days[dayOfWeek]];
    if (!openingTimesToday) {
      return "Closed";
    }

    let closingTimeToday = openingTimesToday[1];
    let closingTimeMinutes =
      parseInt(closingTimeToday.split(":")[0]) * 60 +
      parseInt(closingTimeToday.split(":")[1]);

    if (closingTimeMinutes < openingTimesToday[0]) {
      closingTimeMinutes += 24 * 60;
    }

    if (currentTime >= closingTimeMinutes) {
      return "Closed";
    }

    const hoursUntilClosing = Math.floor(
      (closingTimeMinutes - currentTime) / 60
    );
    const minutesUntilClosing = (closingTimeMinutes - currentTime) % 60;

    if (hoursUntilClosing > 0) {
      const closingTime = new Date();
      closingTime.setHours(parseInt(closingTimeToday.split(":")[0]));
      closingTime.setMinutes(parseInt(closingTimeToday.split(":")[1]));
      const closingTimeFormatted = closingTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return `Open until ${closingTimeFormatted}`;
    }

    const pluralMinutes = minutesUntilClosing !== 1 ? "s" : "";
    return `Open for ${minutesUntilClosing} more minute${pluralMinutes}`;
  }

  const openUntil = getOpenUntil(openingHours);

  return (
    <div>
      <ul className={classes.ul}>
        <li>{openUntil} </li>
        <li
          onClick={() => setModalIsOpen(true)}
          className={classes.informations}
        >
          <FcInfo size="20px" style={{ marginRight: 5 }} /> See more
          informations
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

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11235.171302957104!2d19.836434!3d45.251982!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b111906687591%3A0xfc32ea5e3421ca3a!2sChicken%20Chill!5e0!3m2!1ssr!2srs!4v1677652304537!5m2!1ssr!2srs"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="a"
              className={classes.iframe}
            ></iframe>

            <h1>Chicken Chill</h1>
            <p>The best chicken in town</p>

            <h1>Adress</h1>
            <p>Futoška 4, Novi Sad 21000</p>

            <h1>Opening hours</h1>
            <div className={classes.opening}>
              <ul>
                <li>Monday</li>
                <li>Tuesday</li>
                <li>Wednesday</li>
                <li>Thursday</li>
                <li>Friday</li>
                <li>Saturday</li>
                <li>Sunday</li>
              </ul>

              <ul>
                <li>09:00-00:45</li>
                <li>09:00-00:45</li>
                <li>09:00-00:45</li>
                <li>09:00-00:45</li>
                <li>10:00-01:45</li>
                <li>10:00-01:45</li>
                <li>09:00-00:45</li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Info;
