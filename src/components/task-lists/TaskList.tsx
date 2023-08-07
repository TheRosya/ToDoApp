import TaskItem from "../task-item/TaskItem";
import { invoke } from '@tauri-apps/api/tauri'
import styles from './TaskList.module.css'


const TaskList = ({ tasks, setTasks }) => {

    
    // Функция для форматирования даты на русском языке
    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
    };

    return date.toLocaleDateString('ru-RU', options);
  };

    // Функция для отображения блока с задачами для конкретной даты
    const renderTaskBlock = (date) => {
    const tasksForDate = tasks.filter(task => new Date(task.date).toDateString() === date.toDateString());

        return (
        <div key={date.toDateString()}>
            <h3 className={styles.relative_date}>{formatDate(date)}</h3>
            {tasksForDate.length > 0 ? (
            <ul>
                {tasksForDate.map(task => (
                    <TaskItem key={task.id} task={task} setTasks={setTasks}/>
                ))}
            </ul>
            ) : (
            <p className={styles.task_no_found}>Нет задач</p>
            )}
        </div>
        );
    };

    // Создаем массив уникальных дат из задач
    const uniqueDates = Array.from(new Set(tasks.map(task => new Date(task.date).toDateString()))).map(dateString => new Date(dateString));

    return (
        <div className="container mx-auto mt-8">
          <div className="grid md:grid-cols-1">
          {uniqueDates.length > 0 ? (
            uniqueDates.map(date => renderTaskBlock(date))
            ) : (
            <p className={styles.task_no_found}>Нет задач</p>
            )}
          </div>
        </div>
    )
};

export default TaskList;
