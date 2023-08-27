import TaskItem from "./TaskItem";
import "./../styles/TaskList.css";
import { useMemo } from "react";
import { formatDate } from "../services/formatDate";
import { getRelativeDate } from "../services/getRelativeDate";

function TaskList({ tasks, setTasks, setSelectedTask }) {
  console.log("render TaskList");

  if (!tasks.length) {
    return <p className="task_no_found">Нет задач</p>;
  }

  // Функция для отображения блока с задачами для конкретной даты
  const renderTaskBlock = (date) => {
    const tasksForDate = tasks.filter(
      (task) => new Date(task.date).toDateString() === date.toDateString()
    );

    return (
      <div key={date.toDateString()} className="items" style={{ width: 600 }}>
        <h3 className="relative_date">
          {getRelativeDate(date)}
          {formatDate(date)}
        </h3>
        <ul>
          {tasksForDate.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              setTasks={setTasks}
              setSelectedTask={setSelectedTask}
            />
          ))}
        </ul>
      </div>
    );
  };

  // Создаем массив уникальных дат из задач
  const uniqueDates = useMemo(() => {
    return Array.from(
      new Set(tasks.map((task) => new Date(task.date).toDateString()))
    ).map((dateString) => new Date(dateString));
  }, [tasks]);

  return (
    <div className="grid">
      {uniqueDates.map((date) => renderTaskBlock(date))}
    </div>
  );
}

export default TaskList;
