import styles from './../styles/AddButton.module.css';

const AddButton = ({visibleModal, openModal}) => {

    if (visibleModal) {
        return null;
    }
    return (
        <button className={styles.btn} onClick={openModal}>
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
        </button>
    )
}

export default AddButton;