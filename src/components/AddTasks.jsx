import React, { useState } from 'react';

function AddTask() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks(prevTasks => [...prevTasks, task]);
      setTask("");
    }
  };

  const clearFields = () => {
    setTask("");
    setTasks([]);
  };

  return (
    <div>
      <label htmlFor="tarefa">Tarefas:</label>
      <input
        id="tarefa"
        type="text"
        name="tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTask}>
        Adicionar Tarefa
      </button>
      <button onClick={clearFields}>
        Limpar
      </button>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddTask;
