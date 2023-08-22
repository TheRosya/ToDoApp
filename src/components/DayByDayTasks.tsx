import { useState } from "react";
import TaskItem from "./TaskItem";
import './../styles/TaskList.css'
import { formatDate } from "../services/formatDate";

function DayByDayTask ({tasks, setTasks, setSelectedTask}) {
    console.log('render DayByDay')
    const [currentDay, setCurrentDay] = useState(new Date());

    const tasksForDate = tasks.filter(task => new Date(task.date).toDateString() === currentDay.toDateString());

    return (
        <div className='grid'>
            <div className='items'>
                <nav className="nav_days">
                    <button onClick={() => {
                        setCurrentDay(prev => {
                            const newDay = new Date(prev)
                            newDay.setDate(prev.getDate() - 1)
                            return newDay
                        })
                    }}
                    className="nav_days__button"
                    >Назад в прошлое</button>
                    <span className='relative_date'>{formatDate(currentDay)}</span>
                    <button onClick={() => {
                        setCurrentDay(prev => {
                            const newDay = new Date(prev)
                            newDay.setDate(prev.getDate() + 1)
                            return newDay
                        })
                    }}
                    className="nav_days__button"
                    >Назад в будущее</button>
                </nav>
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