import styles from "./../styles/Calendar.module.css";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyModal from "../ui/MyModal/MyModal";
import ChoiseDate from "./ChoiseDate";
import { formatDate } from "../services/formatDate";
import React from "react";

const CalendarComponent = ({
  data,
  setData,
  selectedOption,
  visibleDate,
  setVisibleDate,
}) => {
  console.log("render CalendarComponent");

  const handleDateChange = (date) => {
    if (date) {
      setData((prev) => ({ ...prev, date: date }));
    }
  };

  return (
    <div>
      <MyModal visible={visibleDate} onSideClick={() => setVisibleDate(false)}>
        <ChoiseDate
          selected={data.date}
          onChange={handleDateChange}
          setVisibleDate={setVisibleDate}
        />
      </MyModal>
      <div
        className={styles.container}
        onClick={() => {
          setVisibleDate(true);
        }}
      >
        <FontAwesomeIcon
          icon={faCalendar}
          size="1x"
          className={styles.calendar_icon}
        />
        {selectedOption.value === "custom" ? (
          <span className={styles.text}>{formatDate(data.date)}</span>
        ) : (
          <span className={styles.text}>{selectedOption.label}</span>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
