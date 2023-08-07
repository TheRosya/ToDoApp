import styles from './TaskItem.module.css';
import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'

function TaskItem ({ task, setTasks }) {

    const [fadeOut, setFadeOut] = useState(false);

    const handleDeleteTask = (taskId) => {
        setTasks(prev => {
            const updatedTasks = prev.filter((task) => task.id !== taskId);
            const sortedList = updatedTasks.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            const newTask = sortedList.map((task, index) => ({ ...task, id: index + 1 }));
            invoke<String>("write_json_to_file", {content: JSON.stringify(newTask)})
              .then(console.log)
              .catch(console.error)
            return newTask;
          });
      };

    const handleFinishTask = () => {
        // setFadeOut(true);
        // setTimeout(() => handleDeleteTask(task.id), 300);
        handleDeleteTask(task.id)

    };

    return (
      <li key={task.id} className={styles.task_item}>
        <div key={task.id} className={styles.card}>
          <h2 className={styles.title}>{task.title}</h2>
          <textarea
            
            rows={4}
            readOnly
            className={styles.description}
            value={task.shortDescription}></textarea><br />
          <button className={styles.btn} onClick={handleFinishTask}>
            Завершить
          </button>
        </div>
      </li>
    )
} 

export default TaskItem

