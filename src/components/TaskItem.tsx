import "./../styles/TaskItem.css";
import { handleDeleteTask } from "../services/tasksHandlers";

function TaskItem({ task, setTasks, setSelectedTask }) {
  console.log("render TaskItem");
  return (
    <li key={task.id} className="item" onClick={() => setSelectedTask(task)}>
      <div className="flex" style={{ alignItems: "flex-start" }}>
        <p className="item__title">{task.title}</p>
      </div>
      <p className="item__description" onClick={(e) => e.stopPropagation()}>
        {task.shortDescription}
      </p>
      <button
        className="item__complete_button"
        onClick={(e) => {
          handleDeleteTask(task.id, setTasks);
          e.stopPropagation();
        }}
      >
        Завершить
      </button>
    </li>
  );
}

export default TaskItem;
