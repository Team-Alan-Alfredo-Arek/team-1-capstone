import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { removeTask } from "../store/task";

const DeleteTaskComponent = ({ taskId, removeTask }) => {
  const handleDelete = () => {
    removeTask({ id: taskId });
  };

  console.log("taskId", taskId);
  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete Task
    </Button>
  );
};

const mapToStateProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTask: (task) => dispatch(removeTask(task)),
  };
};

export default connect(
  mapToStateProps,
  mapDispatchToProps
)(DeleteTaskComponent);
