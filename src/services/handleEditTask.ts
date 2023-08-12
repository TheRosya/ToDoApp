const handleEditTask = (taskId, data, setTasks) => {

    setTasks(prev => {
        // Создаем новый массив задач, обновляя нужную задачу
        const updatedTasks = prev.map(task => {
        if (task.id === taskId) {
            return { ...data };
        }
        return task;
        })
        return updatedTasks;
    });
    }

export default handleEditTask;