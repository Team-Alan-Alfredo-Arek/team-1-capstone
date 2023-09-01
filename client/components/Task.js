// TaskComponent.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask } from "../store/task";

export default function TaskComponent() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <button
        onClick={() =>
          handleAddTask({
            name: "New Task",
            description: "New Task Description",
          })
        }>
        Add Task
      </button>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}
