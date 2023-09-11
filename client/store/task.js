import axios from "axios";

const CREATE_TASK = "CREATE_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";
const GET_TASKS = "GET_TASKS";

const TOKEN = "token";

const createTask = (task) => ({
  type: CREATE_TASK,
  payload: task,
});

const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

const deleteTask = (task) => ({
  type: DELETE_TASK,
  payload: task,
});

const getTasks = (tasks) => ({
  type: GET_TASKS,
  tasks,
});
export const addTask = (newTask) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.post("/api/task", newTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(createTask(response.data));
    } catch (error) {
      console.log("Failed to add new task:", error);
    }
  };
};
export const editTask = (task) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/task/${task.id}`, task, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedTask = res.data;
      dispatch(updateTask(updatedTask));
    } catch (error) {
      console.error("There was an error updating the task", error);
    }
  };
};

export const removeTask = (tasks) => (dispatch) => {
  axios
    .delete(`/api/task/${tasks?.id}`)
    .then(() => dispatch(deleteTask(tasks?.id)))
    .catch((err) => console.log(err));
};
export const fetchTasks = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.get("/api/task", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const tasks = res.data;
    dispatch(getTasks(tasks));
  };
};
const initialState = [];

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return [...state, action.payload];
    case UPDATE_TASK:
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case GET_TASKS:
      return action.tasks;
    default:
      return state;
  }
}
