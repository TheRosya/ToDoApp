import { useEffect, useMemo, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import Header from "./Header.tsx";
import AddButton from "./AddButton.tsx";
import TaskList from "./TaskList.tsx";
import MyModal from "../ui/MyModal/MyModal.tsx";
import CreateTaskform from "./CreateTaskForm.tsx";
import 'react-day-picker/dist/style.css';

function Home() {

  const [visibleModal, setVisibleModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    invoke<string>("get_json_from_file")
      .then((data: any) => setTasks(JSON.parse(data)))
      .catch(console.log)

  }, [])

  useEffect(() => {
    invoke<String>("write_json_to_file", {content: JSON.stringify(tasks)})
        .then(console.log)
        .catch(console.error)
  }, [tasks])
  
  const sortedList = useMemo(() => {
    if (tasks) {
      return [...tasks].slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return []
  }, [tasks])

  const OpenModal = () => {
    setVisibleModal(true);
  }

  
  return (
    <div className='text-xl'>
      <Header />
      <TaskList tasks={sortedList} setTasks={setTasks} />
      <MyModal visible={visibleModal} setVisible={setVisibleModal}>
        <CreateTaskform setTasks={setTasks} setVisible={setVisibleModal}/>
      </MyModal>
      <AddButton visibleModal={visibleModal} openModal={OpenModal} />
    </div>
  )
    
};
  
export default Home;