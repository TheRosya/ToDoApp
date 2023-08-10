import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import CalendarComponent from "./Calendar";
import styles from './../styles/CreateTaskForm.module.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface Data {
  title: string;
  shortDescription: string;
  date: Date | null;
}

const clearData = {
  title: "",
  shortDescription: "",
  date: null,
}

const clearOption = {value: 'not choosed', label: 'Срок выполнения'}


const CreateTaskform = ({ setTasks, setVisible}) => {


  const options = [
    {value: 'today', label: 'Сегодня'},
    {value: 'tomorrow', label: 'Завтра'},
    {value: 'afterTomorrow', label: 'Послезавтра'},
    {value: 'custom', label: 'Другая дата'},
  ]
  
  const [visibleDate, setVisibleDate] = useState(false);
  const [data, setData] = useState<Data>(clearData);
  const [selectedOption, setSelectedOption] = useState(clearOption);


  const CreateTask = e => {
    e.preventDefault();

    setTasks(prev => {
      return [...prev, {id: prev.length + 1, ...data } ]
    })
    setVisible(false);
    setData(clearData);
    setSelectedOption(clearOption);
  }    


    return (
        <div className={styles.container}>
          <div>
            <button
              id='close_button'
              onClick={() => setVisible(false)}
              className={styles.close_button}
              type="button"
              >
              <FontAwesomeIcon icon={faXmark} className={styles.close_icon}/>
            </button>
          </div>
          <div>
            <input id='title' placeholder="Название задачи" onChange={
              (event) => setData(prev => ({...prev, title : event.target.value}))}
              className={styles.input}
              value={data.title}
            /><br />
            <textarea id='shortDescription' placeholder="Описание" onChange={
              (event) => {
                setData(prev => ({...prev, shortDescription : event.target.value}));
              }
            }
              className={styles.textarea}
              rows={8}
              value={data.shortDescription}
            /><br />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <CalendarComponent
              options={options}
              data={data}
              setData={setData}
              selectedOption={selectedOption}
              setOption={setSelectedOption}
              visibleDate={visibleDate}
              setVisibleDate={setVisibleDate}
              />
            <button id='Add'
              onClick={(e) => {
                CreateTask(e);
              }}
              disabled={data.title && data.date !== null ? false : true}
              className={styles.add_button}
              type="button"
            >
              Создать
            </button>
          </div>
        </div>
    )
}

export default CreateTaskform;