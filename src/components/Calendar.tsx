import styles from "./../styles/Calendar.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import { useEffect, useState } from "react";
registerLocale('ru', ru)
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Calendar = ({data, setData}) => {

  const [selectedOption, setSelectedOption] = useState('today');

  const handleDateChange = (date) => {
    setSelectedOption('custom');
    setData(prev => ({...prev,
      date: date,
    }));
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const afterTomorrow = new Date();
    afterTomorrow.setDate(today.getDate() + 2);

    switch (option) {
      case 'today':
        setData(prev => ({...prev,
          date: today,
        }));
        break;
      case 'tomorrow':
        setData(prev => ({...prev,
          date: tomorrow,
        }));
        break;
      case 'afterTomorrow':
        setData(prev => ({...prev,
          date: afterTomorrow,
        }));
        break;
      default:
        setData(prev => ({...prev,
          date: null,
        }));
    }
  };

  useEffect(() => {
    setData(prev => ({...prev,
      date: new Date(),
    }));
  }, [])


  return ( 
    <div className={styles.container}>
      <div className={styles.datePicker}>
        <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
        <select className={styles.select} value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
            <option value="today">Сегодня</option>
            <option value="tomorrow">Завтра</option>
            <option value="afterTomorrow">Послезавтра</option>
            <option value="custom">Выбрать другую дату</option>
        </select>
            
    </div>
      {selectedOption === 'custom' && (
        <DatePicker
          className={styles.calendar_icon}
          id="datePicker"
          title="Календарь"
          selected={data.date}
          dateFormat="dd/MM/yyyy"
          placeholderText="-/-/-"
          onChange={handleDateChange}
          locale='ru'
          withPortal
          fixedHeight
          minDate={new Date()}
        />
      )}
    </div>

  )
}   

export default Calendar;