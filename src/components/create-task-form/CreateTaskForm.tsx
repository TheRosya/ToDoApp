import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import Calendar from "./calendar/Calendar";

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
      <div className="fixed z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        
        <div className="bg-white p-8 rounded shadow-lg relative min-w-max">
          <button
            id='close_button'
            onClick={togglePopup}
            className="absolute top-0 right-0 mt-2 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:bg-gray-800"
            type="button"
            >
            X
          </button>
        <h2 className="text-xl font-bold mb-4">Создать новую задачу</h2>
          <div className="mb-4">
            <input id='title' placeholder="Введите имя задачи" onChange={
              (event) => setData(prev => ({...prev, title : event.target.value}))}
              className="appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            /><br />
          </div>
          <Calendar data={data} setData={setData}/>
          <div className="mb-4">
            <textarea id='shortDescription' placeholder="Короткое описание задачи" onChange={
              (event) => {
                setData(prev => ({...prev, shortDescription : event.target.value}));
              }
            }
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              rows={4}
            /><br />
          </div>
          {!isFormValid && <p className="text-red-600 m-2">Вы не дали название задаче</p>}
          <div className="flex items-center justify-between">
            <button id='Add'
              onClick={(e) => {
                CreateTask(e);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:bg-blue-500"
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