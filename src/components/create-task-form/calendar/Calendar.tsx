import styles from "./Calendar.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import { useDeferredValue, useEffect } from "react";
registerLocale('ru', ru)


const Calendar = ({data, setData}) => {
  
  useEffect(() => {
    setData(prev => ({...prev,
      date: new Date(),
    }));
  }, [])

  const handleDateChange = (date) => {
    console.log("Изменение даты")
    if (date) {
      setData(prev => ({...prev,
        date: date,
      }));
    } else {
      setData(prev => ({...prev,
        date: new Date()
      }));
      }
    };

  return ( 
    <div>
      <DatePicker
        id="datePicker"
        selected={data.date == null ? new Date() : data.date }
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        locale='ru'
        minDate={new Date()}
        isClearable    
      />
      {/* {data.day && (
        <p>
          Выбранная дата: {data.year}-{data.month}-{data.day}
        </p>
      )} */}
    </div>
  )
}   

export default Calendar;