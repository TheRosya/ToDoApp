import { useMemo } from "react";
import ByWeeks from "./ByWeeks";
import DayByDayTask from "./DayByDayTasks";
import InfinityLayout from "./InfinityLayout";

function ShowTasks({ view, tasks, setTasks, setSelectedTask }) {
  console.log("render ShowTasks");
  const sortedList = useMemo(() => {
    if (tasks) {
      return [...tasks]
        .slice()
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }
    return [];
  }, [tasks]);

  if (view.value === "infinity") {
    return (
      <InfinityLayout
        tasks={sortedList}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
    );
  }

  if (view.value === "dayByDay") {
    return (
      <DayByDayTask
        tasks={sortedList}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
    );
  }

  if (view.value === "byWeeks") {
    return (
      <ByWeeks
        tasks={sortedList}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
    );
  }
}

export default ShowTasks;
