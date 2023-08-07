import { useState } from 'react';
import CreateTaskform from '../create-task-form/CreateTaskForm';
import styles from "./FormPopup.module.css"

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
