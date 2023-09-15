import axios from "axios";

const CREATE_EVENT = "CREATE_EVENT";
const UPDATE_EVENT = "UPDATE_EVENT";
const DELETE_EVENT = "DELETE_EVENT";
const GET_EVENTS = "GET_EVENTS";

//Single Event Functionalities

const GET_SINGLE_EVENT = "GET_SINGLE_EVENT";

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

//Single event actions creators

const getSingleEvent = (event) => ({
  type: GET_SINGLE_EVENT,
  payload: event,
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

export const deleteEventThunk = (eventId) => async (dispatch) => {
  try {
    await axios.delete(`/api/events/${eventId}`);
    dispatch(deleteEvent(eventId));
  } catch (error) {
    console.error("There was an error deleting the event:", error);
  }
};

export const getEventsThunk = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.get("/api/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const events = res.data;
    dispatch(getEvents(events));
  };
};
export const getSingleEventThunk = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.get(`/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const event = res.data;

    dispatch(getSingleEvent(event));
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
    case GET_SINGLE_EVENT:
      return [...state, action.payload];

    default:
      return state;
  }
}
