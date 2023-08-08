import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import FormPopup from "./FormPopup.tsx";
import Header from "./Header.tsx";
import AddButton from "./AddButton.tsx";
import TaskList from "./TaskList.tsx";

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