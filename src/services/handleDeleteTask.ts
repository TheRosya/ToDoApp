const handleDeleteTask = (taskId, setTasks) => {
    
    
    setTasks(prev => {
      const updatedTasks = prev.filter((task) => task.id !== taskId);
      return updatedTasks.map((task, index) => ({ ...task, id: index + 1 }));  
      });
  };

export default handleDeleteTask;
