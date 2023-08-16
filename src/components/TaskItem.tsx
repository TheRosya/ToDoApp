import styles from './../styles/TaskItem.module.css';
import './../styles/TaskItem.module.css'

import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import handleDeleteTask from '../services/handleDeleteTask';

function TaskItem ({ task, setTasks, setSelectedTask }) {
  


    return (
      <li key={task.id} className={styles.task_item} onClick={() => setSelectedTask(task)}>
        <div key={task.id} className={styles.card}>
          <div className={styles.flex}>
            <h2 className={styles.title}>{task.id}. {task.title}</h2>
            <button className={styles.item_icons} onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
          <textarea
          onClick={(e) => e.stopPropagation()}
          defaultValue={task.shortDescription}
          readOnly
          /><br />
          <button className={styles.btn} onClick={
            (e) => {
              handleDeleteTask(task.id, setTasks)
              e.stopPropagation()
            }
            }>
            Завершить
          </button>
      </div>
    </li>
    )
} 

export default TaskItem

