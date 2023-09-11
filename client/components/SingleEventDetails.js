import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEventThunk } from "../store/events";
import { fetchTasks, addTask, removeTask, editTask } from "../store/task";
import { useParams } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { motion } from "framer-motion";

export default function SingleEventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );

  const tasks = useSelector((state) => state.tasks).filter(
    (task) => task.eventId === Number(id)
  );

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [status, setStatus] = useState("To be assigned");

  // States for Edit Modal
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSingleEventThunk(id));
      dispatch(fetchTasks());
    }
  }, [dispatch, id]);

  if (!event) return null;

  const handleAddTask = () => {
    dispatch(
      addTask({
        name: taskName,
        description: taskDescription,
        startDate,
        dueDate,
        status,
        userId: auth.id,
        eventId: event.id,
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
    setShowEditModal(false);
  };

  const handleEditTaskClick = (task) => {
    setEditTaskId(task.id);
    setEditTaskName(task.name);
    setEditTaskDescription(task.description);
    setEditStartDate(task.startDate);
    setEditDueDate(task.dueDate);
    setEditStatus(task.status);
    setShowEditModal(true);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  const eventCardStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  };

  return (
    <Container>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          opacity: {
            delay: 0.2,
          },
          scale: {
            type: "spring",
            damping: 8,
            stiffness: 70,
            restDelta: 0.01,
          },
        }}>
        <Row className="mb-3" key={event.id} style={eventCardStyle}>
          <Col>
            <h2>{event.name}</h2>
            <p>Date: {formatDate(event.date)}</p>
            <p>Guest Count: {event.guestCount}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
          </Col>
        </Row>

        <h3>Tasks for this event:</h3>
        <ListGroup className="mt-4">
          {tasks
            ?.filter((task) => task.user?.id === auth?.id)
            .map((task) => (
              <ListGroup.Item key={task.id}>
                {task.name} ({task.description}) ({task.status}) (Start Date:{" "}
                {formatDate(task.startDate)}, Due Date:{" "}
                {formatDate(task.dueDate)})
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

        <Button variant="primary" onClick={() => setShowTaskModal(true)}>
          Add Task for this Event
        </Button>

        {/* Modal for adding new task */}
        <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  <option value="To be assigned">Pending</option>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddTask}>
              Add Task
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
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
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditTask}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </motion.div>
    </Container>
  );
}
