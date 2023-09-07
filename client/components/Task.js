import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, removeTask, editTask } from "../store/task";
import { Form, Button, Container, ListGroup, Modal, } from "react-bootstrap";

export default function TaskComponent() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const auth = useSelector((state) => state.auth);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [status, setStatus] = useState("");

  // States for Edit Modal
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editStatus, setEditStatus] = useState("");

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
        status,
        userId: auth.id,
      })
    );
    setTaskName("");
    setTaskDescription("");
    setStartDate("");
    setDueDate("");
    setStatus("");
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask({ id: taskId }));
  };

  const handleEditTaskClick = (task) => {
    setEditTaskId(task.id);
    setEditTaskName(task.name);
    setEditTaskDescription(task.description);
    setEditStartDate(task.startDate);
    setEditDueDate(task.dueDate);
    setShowModal(true);
  };

  const handleEditTask = () => {
    dispatch(
      editTask({
        id: editTaskId,
        name: editTaskName,
        description: editTaskDescription,
        status: editStatus,
        startDate: editStartDate,
        dueDate: editDueDate,
      })
    );
    setShowModal(false);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
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
          <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Status Select"
            value={status}
            style={{ backgroundColor: "#f4f4f4", borderColor: "#ccc" }}
            onChange={(e) => setStatus(e.target.value)}>
            <option value="To be assigned">To be assigned</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </Form.Select>
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
        {tasks
          ?.filter((task) => task.user?.id === auth?.id)
          .map((task) => (
            <ListGroup.Item key={task.id}>
              {task.name} ({task.description}) ({task.status}) (Start Date:{" "}
              {formatDate(task.startDate)}, Due Date: {formatDate(task.dueDate)}
              )
              <Button
                variant="danger"
                onClick={() => handleDeleteTask(task.id)}
                style={{ marginLeft: "10px" }}>
                Delete
              </Button>
              <Button
                variant="info"
                onClick={() => handleEditTaskClick(task)}
                style={{ marginLeft: "10px" }}>
                Edit
              </Button>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Edit Task Name</Form.Label>
            <Form.Control
              type="text"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Edit Description</Form.Label>
            <Form.Control
              type="text"
              value={editTaskDescription}
              onChange={(e) => setEditTaskDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Edit Status</Form.Label>
            <Form.Select
              aria-label="Edit Status Select"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}>
              <option value="To be assigned">To be assigned</option>
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Edit Start Date</Form.Label>
            <Form.Control
              type="date"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Edit Due Date</Form.Label>
            <Form.Control
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
