import styles from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [styles.MyModal]

    if (visible) {
        rootClasses.push(styles.active)
    } else {
        rootClasses.push(styles.disabled)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default MyModal;