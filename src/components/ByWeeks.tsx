import { useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import DateInfo from "./DateInfo";
import styles from '../styles/ByWeek.module.css'

const ByWeeks = ({tasks, setTasks, setSelectedTask}) => {

    const [date, setDate] = useState(new Date())

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
        return array
    }, [date])

    // Функция для форматирования даты на русском языке
    const formatDate = (date) => {
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        };

        let formattedDate = date.toLocaleDateString('ru-RU', options);

        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        return formattedDate;
    };

    // Функция для форматирования даты на русском языке
    const formatWeekday = (date) => {
        const options = {
            weekday: 'short',
            
        };

        let formattedDate = date.toLocaleDateString('ru-RU', options);

        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        return formattedDate;
    };

    // Функция для форматирования даты на русском языке
    const formatDay = (date) => {
        const options = {
            day: 'numeric',
        };

        let formattedDate = date.toLocaleDateString('ru-RU', options);

        return formattedDate;
    };

    // Функция для отображения блока с задачами для конкретной даты
    const renderTaskBlock = (date) => {
        const tasksForDate = tasks.filter(task => new Date(task.date).toDateString() === date.toDateString());

        return (
            <div key={date.toDateString()} className={styles.items}>
                <h3 className={styles.relative_date}><DateInfo date={date} />{formatDate(date)}</h3>
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
            <button onClick={() => {
                setDate(prev => {
                    let newDay = new Date(prev);
                    newDay.setDate(prev.getDate() - 7)
                    return newDay 
                })
            }}>Прошлая неделя</button>
            <button onClick={() => {
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
                    className={styles.header__item}
                    onClick={() => setDate(date)}
                    >
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