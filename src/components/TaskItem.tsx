import styles from './../styles/TaskItem.module.css';
import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const maxChars = 70; // Максимальное количество символов для краткого описания4

function TaskItem ({ task, setTasks }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const getDescription = (description) => {
    if (expanded || description.length <= maxChars) {
      return description;
    }

    const truncatedDescription = description.slice(0, maxChars);


    return truncatedDescription + '\n...'; // Добавляем многоточие, чтобы показать возможность раскрытия
  };
  

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
          <div className={`${styles['description_container']} ${expanded ? styles.expanded : ''}`}>
            {task.shortDescription && (
              <p className={styles.description}>
                {getDescription(task.shortDescription)}
              </p>
            )}
            {task.shortDescription && task.shortDescription.length > maxChars && (
              <div className={styles.arrow_container} onClick={handleToggle}>
                <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} className={styles.arrow_icon} />
              </div>
            )}
          </div>
          <button className={styles.btn} onClick={handleFinishTask}>
            Завершить
          </button>
        </div>
      </li>
    )
} 

export default TaskItem

