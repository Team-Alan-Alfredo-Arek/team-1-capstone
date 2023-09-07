import axios from "axios";

const CREATE_EVENT = "CREATE_EVENT";
const UPDATE_EVENT = "UPDATE_EVENT";
const DELETE_EVENT = "DELETE_EVENT";
const GET_EVENTS = "GET_EVENTS";

const TOKEN = "token";

const createEvent = (event) => ({
  type: CREATE_EVENT,
  payload: event,
});

const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  payload: event,
});

const deleteEvent = (event) => ({
  type: DELETE_EVENT,
  payload: event,
});

const getEvents = (events) => ({
  type: GET_EVENTS,
  events,
});

export const createEventThunk = (newEvent) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.post("/api/events", newEvent, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(createEvent(response.data));
    } catch (error) {
      console.log("Failed to add new event:", error);
    }
  };
};

export const updateEventThunk = (event) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/events/${event.id}`, event, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedEvent = res.data;
      dispatch(updateEvent(updatedEvent));
    } catch (error) {
      console.error("There was an error updating the event", error);
    }
  };
};

export const deleteEventThunk = (event) => (dispatch) => {
  axios
    .delete(`/api/events/${event?.id}`)
    .then(() => dispatch(deleteEvent(event?.id)))
    .catch((err) => console.log(err));
};

export const getEventsThunk = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/events");
    const events = res.data;
    dispatch(getEvents(events));
  };
};

const initialState = [];

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return [...state, action.payload];
    case UPDATE_EVENT:
      return state.map((event) =>
        event.id === action.payload.id ? { ...event, ...action.payload } : event
      );
    case DELETE_EVENT:
      return state.filter((event) => event.id !== action.payload);
    case GET_EVENTS:
      return action.events;
    default:
      return state;
  }
}

