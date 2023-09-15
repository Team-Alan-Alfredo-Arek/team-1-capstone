import axios from "axios";
import socket from "../socket";

// Action Types
const FETCH_MESSAGES = "FETCH_MESSAGES";
const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";

const TOKEN = "token";

// Action Creators
const addNewMessage = (message) => ({
  type: ADD_NEW_MESSAGE,
  payload: message,
});

const getMessages = (messages) => ({
  type: FETCH_MESSAGES,
  messages,
});

export const addNewMessageThunk =
  (content, eventId) => async (dispatch, getState) => {
    try {
      const { id: userId } = getState().auth;

      const newMessage = {
        message: content,
        userId,
        eventId,
      };

      const token = window.localStorage.getItem(TOKEN);

      if (!token) throw new Error("Token not available");

      const response = await axios.post("/api/chat", newMessage, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const savedMessage = response.data;
      dispatch(addNewMessage(savedMessage));

      // Emit socket event only after the message is saved in the database.
      socket.emit("new-message", savedMessage);
    } catch (error) {
      console.log("Failed to add new message:", error);
    }
  };

export const sendMessage =
  (message) =>
  (dispatch, getState, { socket }) => {
    const newMessage = {
      messageContent: message.message,
      userId: getState().auth.id,
    };

    socket.emit("new-message", newMessage);
    dispatch(addNewMessage(newMessage));
  };

export const fetchMessages = (eventId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (!token) throw new Error("Token not available");

      const res = await axios.get(`/api/chat/${eventId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const messages = res.data;

      dispatch(getMessages(messages));
    } catch (error) {
      console.log("Failed to fetch messages:", error);
    }
  };
};

export const startListeningForMessages = () => (dispatch) => {
  socket.on("new-message", () => {
    dispatch(fetchMessages());
  });
};
// Initial State
const initialState = [];

// Reducer
export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_MESSAGE:
      return [...state, action.payload];
    case FETCH_MESSAGES:
      return action.messages;
    default:
      return state;
  }
}
