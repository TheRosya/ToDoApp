import TaskItem from "./TaskItem";
import styles from './../styles/TaskList.module.css'
import DateInfo from "./DateInfo";
import { useMemo } from "react";


const TaskList = ({ tasks, setTasks, setSelectedTask }) => {
    

    if (!tasks.length) {
        return (
            <p className={styles.task_no_found}>Нет задач</p>
        )
    }
    
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

    // Создаем массив уникальных дат из задач
    const uniqueDates = useMemo(() => {
        return Array.from(new Set(tasks.map(task => new Date(task.date).toDateString()))).map(dateString => new Date(dateString));
    }, [tasks])


    return (
        <div className={styles.grid}>
          {uniqueDates.map(date => renderTaskBlock(date))}
        </div>
    )
};

export default TaskList;
