import CreateTaskform from './CreateTaskForm';
import styles from "./../styles/FormPopup.module.css"

const clearData = {
    title: '',
    shortDescription: '',
    deadline: ''
}

const FormPopup = ({ setTasks, isOpen, togglePopup} ) => {

  return (
    <div>
      {isOpen && (<CreateTaskform setTasks={setTasks} togglePopup={togglePopup} />)}
    </div>
    );
};

export default FormPopup;
