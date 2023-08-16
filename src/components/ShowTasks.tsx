import { useMemo } from "react";
import ByWeeks from "./ByWeeks"
import DayByDayTask from "./DayByDayTasks"
import InfinityLayout from "./InfinityLayout";


const ShowTasks = ({ view, tasks, setTasks, setSelectedTask }) => {

    const sortedList = useMemo(() => {
        if (tasks) {
          return [...tasks].slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        return []
      }, [tasks]);

    if (view === 'infinity') {
        return (
            <InfinityLayout tasks={sortedList} setTasks={setTasks} setSelectedTask={setSelectedTask} />
        )
    }

    if (view === 'dayByDay') {
        return (
            <DayByDayTask tasks={sortedList} setTasks={setTasks} setSelectedTask={setSelectedTask} />
        )
    }

    if (view === 'byWeeks') {
        return (
            <ByWeeks tasks={sortedList} setTasks={setTasks} setSelectedTask={setSelectedTask} />
        )
    }

};

export default ShowTasks;