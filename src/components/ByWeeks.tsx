import { useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import styles from '../styles/ByWeek.module.css'
import formatDate from "../services/formatDate";
import formatWeekday from "../services/formatWeekday";
import formatDay from "../services/formatDay";
import getRelativeDate from "../services/getRelativeDate";
import isSameDate from "../services/isSameDate";

const ByWeeks = ({tasks, setTasks, setSelectedTask}) => {


    const today = new Date()

    const [date, setDate] = useState(new Date())

    const ifButtonDisabled = (date, baseStyle) => {
        
        let rootClass = [baseStyle]
        
        if (new Date(date) < today) {
            rootClass.push(styles.disabled)
        } else {
            rootClass.push(styles.active)
        }
        return rootClass.join(' ')
    }

    const ifPrevWeekDisabled = (baseStyle) => {
        
        let rootClass = [baseStyle]
        
        if (today > week[0] || isSameDate(today, week[0])) {
            rootClass.push(styles.disabled)
        } else {
            rootClass.push(styles.active)
        }
        return rootClass.join(' ')
    };

    const week = useMemo(() => {

        let todayDay = date.getDay()
        if (todayDay === 0) {
            todayDay = 7;
        } 
        const firstDayOfWeek = new Date(date)
   
        let array = []

        firstDayOfWeek.setDate(date.getDate() - (todayDay - 1)) 
        let currentDate = new Date(firstDayOfWeek)
        for (let i = 0; i<7; i++) {
            array.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1)
        };

        console.log(array[0] < today)
        return array
        
    }, [date])


    // Функция для отображения блока с задачами для конкретной даты
    const renderTaskBlock = (date) => {
        const tasksForDate = tasks.filter(task => new Date(task.date).toDateString() === date.toDateString());

        return (
            <div key={date.toDateString()} className={styles.items}>
                <h3 className={styles.relative_date}>{getRelativeDate(date)}{formatDate(date)}</h3>
                <ul>
                    {tasksForDate.map(task => (
                        <TaskItem key={task.id} task={task} setTasks={setTasks} setSelectedTask={setSelectedTask}/>
                    ))}
                </ul>
            </div>
            );
    };

    return (
        <>
            <button
                className={ifPrevWeekDisabled(styles.changeWeekButton)}
                onClick={() => {setDate(prev => {
                    let newDay = new Date(prev);
                    newDay.setDate(prev.getDate() - 7);
                    return newDay 
                })}}
                disabled={today > week[0] || isSameDate(today, week[0]) ? true : false}
                >Прошлая неделя</button>
            <button className={styles.changeWeekButton} onClick={() => {
                setDate(prev => {
                    let newDay = new Date(prev);
                    newDay.setDate(prev.getDate() + 7)
                    return newDay 
                })
            }}>Следующая неделя</button>
            <div className={styles.header}
            >
                {week.map(date => 
                (
                    <div
                    className={ifButtonDisabled(date, styles.header__item)}>
                        <h1>{formatWeekday(date)}</h1>
                        <h1>{formatDay(date)}</h1>
                    </div>
                ))}
            </div>
            <div className={styles.grid}>
                {week.map(date => renderTaskBlock(date))}
            </div>
        </>
    );
};

export default ByWeeks;