import { useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import DateInfo from "./DateInfo";
import styles from './../styles/TaskList.module.css'
import formatDate from "../services/formatDate";

const DayByDayTask = ({tasks, setTasks, setSelectedTask}) => {

    const [currentDay, setCurrentDay] = useState(new Date());

    const tasksForDate = tasks.filter(task => new Date(task.date).toDateString() === currentDay.toDateString());

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