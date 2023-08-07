import { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import TaskItem from "../task-item/TaskItem.tsx";
import { invoke } from '@tauri-apps/api/tauri'
import FormPopup from "../form-popup/FormPopup.tsx";
import Header from "../header/Header.tsx";
import AddButton from "../add-button/AddButton.tsx";
import DateDescription from "../date-description/DateDescription.tsx";
import TaskList from "../task-lists/TaskList.tsx";

function Home() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    invoke<string>("get_json_from_file")
      .then((data: any) => setTasks(JSON.parse(data)))
      .catch(console.log)
    
    const sortedList = tasks.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setTasks(sortedList);
  }, [])
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <div className='text-xl'>
      <Header />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <FormPopup setTasks={setTasks} isOpen={isOpen} togglePopup={togglePopup} />
      <AddButton isOpen={isOpen} togglePopup={togglePopup} />
    </div>
  )
    
};
  
export default Home;