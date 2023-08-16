import { useEffect, useMemo, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import Header from "../components/Header.tsx";
import AddButton from "../components/AddButton.tsx";
import MyModal from "../ui/MyModal/MyModal.tsx";
import CreateTaskform from "../components/CreateTaskForm.tsx";
import 'react-day-picker/dist/style.css';
import ShowItem from "./ShowItem.tsx";
import SettingView from "../components/SettingView.tsx";
import InfinityLayout from "../components/InfinityLayout.tsx";
import DayByDayTask from "../components/DayByDayTasks.tsx";
import ByWeeks from "../components/ByWeeks.tsx";


function Home() {

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [view, setView] = useState('infinity');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    invoke<string>("get_json_from_file")
      .then((data: any) => setTasks(JSON.parse(data)))
      .catch(console.log)
    
  }, []);

  useEffect(() => {
    if (tasks) {
      invoke<String>("write_json_to_file", {content: JSON.stringify(tasks)})
      .then(console.log)
      .catch(console.error)
    
    }
  }, [tasks]);
  
  const sortedList = useMemo(() => {
    if (tasks) {
      return [...tasks].slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return []
  }, [tasks]);

  const OpenModal = () => {
    setVisibleModal(true);
  };

  
  return (
    
    <div className='text-xl'>
      <SettingView setView={setView}/>
      {view === 'infinity' && (
        <InfinityLayout tasks={sortedList} setTasks={setTasks} setSelectedTask={setSelectedTask} />
      )}
      {view === 'dayByDay' && (
        <DayByDayTask tasks={sortedList} setTasks={setTasks} setSelectedTask={setSelectedTask} />
      )}
      {view === 'byWeeks' && (
        <ByWeeks tasks={sortedList} setTasks={setTasks} setSelectedTask={setSelectedTask} />
      )}
      {selectedTask &&
        (
          <ShowItem key={selectedTask.id} setTasks={setTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
        )
      }
      <MyModal visible={visibleModal} onSideClick={() => {setVisibleModal(false)}}>
        <CreateTaskform setTasks={setTasks} setVisible={setVisibleModal}/>
      </MyModal>
      <AddButton visibleModal={visibleModal} openModal={OpenModal} />
    </div>
  )
    
};
  
export default Home;