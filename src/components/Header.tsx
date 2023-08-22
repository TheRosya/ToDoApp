import styles from './../styles/Header.module.css';

function Header () {
    console.log('render Header')
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>ToDoApp</h1>
            </div>
        </header>
  )

} 

export default Header;