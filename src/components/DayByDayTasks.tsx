import { useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import DateInfo from "./DateInfo";
import styles from './../styles/TaskList.module.css'

const DayByDayTask = ({tasks, setTasks, setSelectedTask}) => {

    const [currentDay, setCurrentDay] = useState(new Date());

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

    // // Функция для отображения блока с задачами для конкретной даты
    // const renderTaskBlock = (date) => {
    //     const tasksForDate = tasks.filter(task => new Date(task.date).toDateString() === currentDay.toDateString());

    //     return (
    //         <div key={date.toDateString()} className={styles.items}>
    //             <h3 className={styles.relative_date}><DateInfo date={date} />{formatDate(date)}</h3>
    //             <ul>
    //                 {tasksForDate.map(task => (
    //                     <TaskItem key={task.id} task={task} setTasks={setTasks} setSelectedTask={setSelectedTask}/>
    //                 ))}
    //             </ul>
    //         </div>
    //         );
    // };
    const tasksForDate = tasks.filter(task => new Date(task.date).toDateString() === currentDay.toDateString());

    // // Создаем массив уникальных дат из задач
    // const currentDate = useMemo(() => {
    //     return Array.from(new Set(tasks.map(task => new Date(task.date).toDateString()))).map(dateString => new Date(dateString));
    // }, [tasks])


    return (
        <div className={styles.grid}>
            <div className={styles.items}>
                <div className={styles.relative_date}>
                    <button onClick={() => {
                        setCurrentDay(prev => {
                            const newDay = new Date(prev)
                            newDay.setDate(prev.getDate() - 1)
                            return newDay
                        })
                    }}>Назад в прошлое</button>
                    {formatDate(currentDay)}
                    <button onClick={() => {
                        setCurrentDay(prev => {
                            const newDay = new Date(prev)
                            newDay.setDate(prev.getDate() + 1)
                            return newDay
                        })
                    }}>Назад в будущее</button>
                </div>
                <ul>
                    {tasksForDate.map(task => (
                        <TaskItem key={task.id} task={task} setTasks={setTasks} setSelectedTask={setSelectedTask}/>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default DayByDayTask;