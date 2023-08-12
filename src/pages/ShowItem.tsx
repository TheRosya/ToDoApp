import { useMemo, useState } from "react";
import Modalstyles from "../ui/MyModal/MyModal.module.css";
import handleEditTask from "../services/handleEditTask";
import MyModal from "../ui/MyModal/MyModal";
import ChoiseDate from "../components/ChoiseDate";


const ShowItem = ({ setTasks, selectedTask, setSelectedTask }) => {

    const [updatedTask, setUpdatedTask] = useState({...selectedTask});
    const [showAlert, setShowAlert] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)

    // Функция для форматирования даты на русском языке
    const formatDate = (date) => {
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        };


        let formattedDate = date.toLocaleDateString('ru-RU', options);

        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        return formattedDate;
    };
    

    const trueIfModified = useMemo(() => {
        return JSON.stringify(updatedTask) !== JSON.stringify(selectedTask) 
    }, [updatedTask, selectedTask])

    return (
        <div>
            <MyModal
            visible={true}
            onSideClick={() => {
                if (trueIfModified) {
                    setShowAlert(true);
                } else {
                    setSelectedTask(null);
                }
            }    
            }>
            <div className="flex">
            <div
                className='container bg-white flex flex-col'
                onClick={(e) => e.stopPropagation()}
                >
                <input value={updatedTask.title} onChange={(event) => setUpdatedTask(prev => ({...prev, title : event.target.value}))} />
                <textarea onChange={(event) => setUpdatedTask(prev => ({...prev, shortDescription : event.target.value}))} value={updatedTask.shortDescription} />
                <span onClick={() => {
                    setShowDatePicker(true)
                }}>{formatDate(new Date(updatedTask.date))}</span>
                {trueIfModified && (
                    <div>
                        <button onClick={() => {
                            setUpdatedTask({...selectedTask})
                        }}>Отменить</button>
                        <button
                        onClick={() => {
                            handleEditTask(selectedTask.id, updatedTask, setTasks)
                            setSelectedTask({...updatedTask})
                        }}
                        >
                        Сохранить
                        </button>
                        
                    </div>
                )
                }
            </div>
            {showDatePicker && (
                    <ChoiseDate 
                        selected={updatedTask.date}
                        setVisibleDate={setShowDatePicker}
                        onChange={(date) => {
                            setUpdatedTask(prev => ({...prev, date : date}))
                    }}/>
                )}
            </div>
        </MyModal>
        {showAlert && (
            <MyModal visible={showAlert} onSideClick={() => {setShowAlert(false)}}>
                <div className="container bg-slate-500 max-w-full">
                    <p>Вы точно хотите уйти? Изменения не буду сохранены</p>
                    <button onClick={() => {
                        setShowAlert(false);
                    }
                    }>Отмена</button>
                    <button onClick={() => {
                        setSelectedTask(null);
                        setShowAlert(false);
                    }}>Продолжить</button>
                </div>
            </MyModal>
        )}
        </div>
    );
};

export default ShowItem;