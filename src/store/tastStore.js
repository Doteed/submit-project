import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "회의 준비", priority: "high" },
    { id: 2, title: "헬스장 가기", priority: "low" },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
