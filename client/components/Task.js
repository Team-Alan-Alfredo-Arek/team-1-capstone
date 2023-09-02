import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, removeTask } from "../store/task";
import { Form, Button, Container, ListGroup } from "react-bootstrap";
import DeleteTask from "./DeleteTask";

export default function TaskComponent() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    dispatch(
      addTask({
        name: taskName,
        description: taskDescription,
        startDate,
        dueDate,
      })
    );
    setTaskName("");
    setTaskDescription("");
    setStartDate("");
    setDueDate("");
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask({ id: taskId }));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Container>
      <h1>Tasks</h1>
      <Form>
        <Form.Group>
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Form>

      <ListGroup className="mt-4">
        {tasks?.map((task) => (
          <ListGroup.Item key={task.id}>
            {task.name} ({task.description}) (Start Date:{" "}
            {formatDate(task.startDate)}, Due Date: {formatDate(task.dueDate)})
            <Button
              variant="danger"
              onClick={() => handleDeleteTask(task.id)}
              style={{ marginLeft: "10px" }}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
