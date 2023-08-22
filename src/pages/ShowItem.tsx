import { useMemo, useState } from "react";
import { handleEditTask } from "../services/tasksHandlers";
import MyModal from "../ui/MyModal/MyModal";
import ChoiseDate from "../components/ChoiseDate";
import { formatDate } from "../services/formatDate";


function ShowItem ({ setTasks, selectedTask, setSelectedTask }) {
    console.log('render ShowItem')
    if (!(selectedTask)) {
        return null;
    }

    const [updatedTask, setUpdatedTask] = useState({...selectedTask});
    const [showAlert, setShowAlert] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    

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
                }}    
            }>
            <div className="flex">
            <div
                className='flex flex_column'
                onClick={(e) => e.stopPropagation()}
                >
                <input value={updatedTask.title} onChange={(event) => setUpdatedTask(prev => ({...prev, title : event.target.value}))} />
                <textarea onChange={(event) => setUpdatedTask(prev => ({...prev, shortDescription : event.target.value}))} value={updatedTask.shortDescription} />
                <span style={{cursor: `pointer`}} onClick={() => {
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
                )}
            </div>
            <MyModal visible={showDatePicker} onSideClick={() => {setShowDatePicker(false)}}>
                <ChoiseDate 
                    selected={updatedTask.date}ss
                    setVisibleDate={setShowDatePicker}
                    onChange={(date) => {
                        setUpdatedTask(prev => ({...prev, date : date}))
                }}/>
            </MyModal>
            </div>
        </MyModal>
        <MyModal visible={showAlert} onSideClick={() => {setShowAlert(false)}}>
            <div className="">
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
        </div>
    );
};

export default ShowItem;