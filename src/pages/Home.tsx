import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import AddButton from "../components/AddButton.tsx";
import MyModal from "../ui/MyModal/MyModal.tsx";
import CreateTaskform from "../components/CreateTaskForm.tsx";
import ShowItem from "./ShowItem.tsx";
import SettingView from "../components/SettingView.tsx";
import ShowTasks from "../components/ShowTasks.tsx";

function Home() {
  console.log("render Home");
  const [visibleCreateTaskForm, setVisibleCreateTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [view, setView] = useState({ value: "infinity", label: "Лента" });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    invoke<string>("get_json_from_file")
      .then((data: any) => setTasks(JSON.parse(data)))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (tasks) {
      invoke<String>("write_json_to_file", { content: JSON.stringify(tasks) })
        .then(console.log)
        .catch(console.error);
    }
  }, [tasks]);

  return (
    <div className="">
      <SettingView view={view} setView={setView} />
      <ShowTasks
        view={view}
        tasks={tasks}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
      <ShowItem
        setTasks={setTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <CreateTaskform
        visible={visibleCreateTaskForm}
        setTasks={setTasks}
        setVisible={setVisibleCreateTaskForm}
      />
      <AddButton
        visible={visibleCreateTaskForm}
        setVisible={setVisibleCreateTaskForm}
      />
    </div>
  );
}

export default Home;
