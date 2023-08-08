import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import Calendar from "./Calendar";
import styles from './../styles/CreateTaskForm.module.css'


interface Data {
  title: string | null;
  shortDescription: string | null;
  date: Date | null;
}

const clearData = {
  title: null,
  shortDescription: null,
  date: new Date(),
}

const CreateTaskform = ({ setTasks, togglePopup}) => {
    
  const [data, setData] = useState<Data>(
    clearData
  );

  const [isFormValid, setIsFormValid] = useState(true);

  const CreateTask = e => {
  
    e.preventDefault();
    if (!data.title) {
      setIsFormValid(false);
      return;
    } else {
      setIsFormValid(true);
    }

    setTasks(prev => {
      let newtasks = [...prev, 
        {id: prev.length + 1, ...data }
      ]
      const sortedList = newtasks.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      invoke<String>("write_json_to_file", {content: JSON.stringify(sortedList)})
        .then(console.log)
        .catch(console.error)
      return sortedList;
    })
    togglePopup();
    setData(clearData)
  }    

    return (
      <div className={styles.body}>
        
        <div className={styles.container}>
          <button
            id='close_button'
            onClick={togglePopup}
            className={styles.close_button}
            type="button"
            >
            X
          </button>
          <div className="mb-4">
            <input id='title' placeholder="Название задачи" onChange={
              (event) => setData(prev => ({...prev, title : event.target.value}))}
              className={styles.input}
            /><br />
          </div>
          <div className="mb-4">
            <textarea id='shortDescription' placeholder="Описание" onChange={
              (event) => {
                setData(prev => ({...prev, shortDescription : event.target.value}));
              }
            }
              className={styles.textarea}
              rows={4}
            /><br />
          </div>
          <Calendar data={data} setData={setData}/>
          <div style={{textAlign: 'right'}}>
            <button id='Add'
              onClick={(e) => {
                CreateTask(e);
              }}
              disabled={data.title ? false : true}
              className={styles.add_button}
              type="button"
            >
              Создать
            </button>
          </div>
      </div>
      </div>
    )
}

export default CreateTaskform;