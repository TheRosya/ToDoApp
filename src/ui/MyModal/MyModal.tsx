import styles from './MyModal.module.css'

function MyModal ({children, visible, onSideClick}) {

    const rootClasses = [styles.MyModal]

    if (visible) {
        rootClasses.push(styles.active)
    } else {
        rootClasses.push(styles.disabled)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={onSideClick}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default MyModal;