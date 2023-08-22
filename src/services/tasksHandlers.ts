export function handleDeleteTask (taskId, setTasks) {    
    setTasks(prev => {
      const updatedTasks = prev.filter((task) => task.id !== taskId);
      return updatedTasks.map((task, index) => ({ ...task, id: index + 1 }));  
      });
  };


export function handleEditTask (taskId, data, setTasks) {

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
