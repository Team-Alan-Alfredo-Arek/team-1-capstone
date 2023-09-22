//Copied from users

import axios from "axios";

//action type constants
export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const CREATE_USER = "CREATE_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";

//action creator
const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

const _getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

const _deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

//thunk
export const getUsers = () => {
  return (dispatch) => {
    axios
      .get("/api/users")
      .then((res) => {
        dispatch(_getUsers(res.data));
      })
      .catch((err) => {
        console.log("Error getting users", err);
      });
  };
};

export const getUser = (id) => {
  return (dispatch) => {
    axios
      .get(`/api/users/${id}`)
      .then((res) => {
        res.data === ""
          ? dispatch(_getUser({ id }))
          : dispatch(_getUser(res.data));
      })
      .catch((err) => {
        console.log("Error getting users", err);
      });
  };
};

export const createUser = (user) => {
  return (dispatch) => {
    axios
      .post("/api/users", user)
      .then((res) => {
        dispatch(_createUser(res.data));
      })
      .catch((err) => {
        console.log("Error creating users", err);
      });
  };
};

export const deleteUser = (id) => async (dispatch) => {
  console.log("user.id thunk", id);
  try {
    await axios.delete(`/api/users/${id}`).then((res) => {
      dispatch(_deleteUser(id));
    });
  } catch (err) {
    console.log("Error deleting users", err);
  }
};

export const updateUser = (user) => {
  return (dispatch) => {
    console.log("store user ID", user.id);
    axios
      .put(`/api/users/${user.id}`, user)
      .then((res) => {
        dispatch(_updateUser(res.data));
      })
      .catch((err) => {
        console.log("Error updating usere", err);
      });
  };
};

//REDUCERs

const initialState = {
  users: [],
  selectedUser: null,
};
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, users: [action.user, ...state.users] };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    case GET_USER:
      return { ...state, selectedUser: action.user };
    case GET_USERS:
      return { users: action.users };
    case UPDATE_USER:
      return {
        users: state.users.map((el) =>
          el.id === action.user.id ? action.user : el
        ),
        user: action.user,
      };
    default:
      return state;
  }
}
