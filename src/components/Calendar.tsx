import styles from "./../styles/Calendar.module.css"
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import { useEffect, useState } from "react";
registerLocale('ru', ru)
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyModal from "../ui/MyModal/MyModal";
import ChoiseDate from "./ChoiseDate";



const CalendarComponent = ({data, setData, selectedOption, setOption, options, visibleDate, setVisibleDate}) => {

  const isSame = (date1, date2) => {
    const today = new Date();
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  const handleDateChange = (date) => {
    if (date) {
      setData(prev => ({...prev,
        date: date,
      }));
    }
  };

  useEffect(() => {
    let date = data.date
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const afterTomorrow = new Date();
    afterTomorrow.setDate(today.getDate() + 2);

    if (date === null) {
      return
    }

    if (isSame(date, today)) {
      setOption(options[0])
    } else if (isSame(date, tomorrow)) {
      setOption(options[1])
    } else if (isSame(date, afterTomorrow)) {
      setOption(options[2])
    } else {
      setOption(options[3])
    }

  }, [data.date] )

  // Функция для форматирования даты на русском языке
  const formatDate = (date) => {
    const options = {
        month: 'short',
        day: 'numeric',
    };

    let formattedDate = date.toLocaleDateString('ru-RU', options);
    return formattedDate
  }
  return ( 
    <div>
      <MyModal visible={visibleDate} setVisible={setVisibleDate}>
        <ChoiseDate
          selected={data.date}
          onChange={handleDateChange}
          setVisibleDate={setVisibleDate}
          />
      </MyModal>
      <div
        className={styles.container}
        onClick={() => {
          setVisibleDate(true)
        }}
        >
        <FontAwesomeIcon
          icon={faCalendar} size="1x"
          className={styles.calendar_icon}
        />
          {selectedOption.value === 'custom' ? (
            <span className={styles.text}>{formatDate(data.date)}</span>
          ) : (<span className={styles.text}>{selectedOption.label}</span>)}
          
      </div>
    </div>


  )
}   

export default CalendarComponent;