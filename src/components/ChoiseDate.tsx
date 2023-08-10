import styles from "./../styles/ChoiseDate.module.css"
import { DayPicker } from 'react-day-picker'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { faSun, faFontAwesome, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ru } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import './../styles/calendar.css';



const today = new Date();
const prevDay = new Date();
prevDay.setDate(today.getDate() - 1);
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const afterTomorrow = new Date();
afterTomorrow.setDate(today.getDate() + 2);

const disabledDays = [
    { from: new Date(1970, 1, 1), to: prevDay }
]

const ChoiseDate = ({selected, onChange, setVisibleDate}) => {
    
    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button
                    className={styles.button}
                    onClick={() => {
                        onChange(today);
                        setVisibleDate(false);
                    }}>
                    <FontAwesomeIcon icon={faFontAwesome} className={styles.icon_tomorrow}/>
                    <span>Сегодня</span>
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        onChange(tomorrow);
                        setVisibleDate(false);
                    }}>
                    <FontAwesomeIcon icon={faSun} className={styles.icon_tomorrow}/>
                    <span>Завтра</span>
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        onChange(afterTomorrow);
                        setVisibleDate(false);
                    }}>
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.icon_tomorrow}/>
                    <span>Послезавтра</span>
                </button>

            </div>
            <div className={styles.calendar}>
                <DayPicker 
                    mode="single"
                    locale={ru}
                    selected={selected}
                    onSelect={onChange}
                    fromMonth={today}
                    disabled={disabledDays}
                    fixedWeeks    
                    styles={{
                        caption: {color: `gray`}
                    }}        
                />
            </div>
            <div className={styles.footer}>
                <button
                    className={styles.add_button}
                    disabled={selected === null ? true : false}
                    onClick={() => setVisibleDate(false)}
                    >
                    Готово
                </button>
            </div>
        </div>
    );
};

export default ChoiseDate;