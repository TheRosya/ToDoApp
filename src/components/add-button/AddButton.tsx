import styles from './AddButton.module.css';

const AddButton = ({isOpen, togglePopup}) => {
    
    return !isOpen ? (
        <button className={styles.btn} onClick={togglePopup}>
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
        </button>
      ) : null;
}

export default AddButton;