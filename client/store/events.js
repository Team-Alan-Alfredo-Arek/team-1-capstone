import axios from "axios";
import {_createUser} from "./users.js";


const CREATE_EVENT = "CREATE_EVENT";
const UPDATE_EVENT = "UPDATE_EVENT";
const DELETE_EVENT = "DELETE_EVENT";
const GET_EVENTS = "GET_EVENTS";
const ADD_USER_TO_EVENT = "ADD_USER_TO_EVENT";

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

const addUserToEvent = (eventId) => ({
  type: ADD_USER_TO_EVENT,
  payload: eventId,
});

//Single event actions creators

const getSingleEvent = (event) => ({
  type: GET_SINGLE_EVENT,
  payload: event,
});

export const createEventThunk = (newEvent) => {
  console.log("newEvent", newEvent)
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      const emailList = newEvent.emailList;
      const response = await axios.post("/api/events", newEvent, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(createEvent(response.data));
//ak not working, where is emailLIst?
      console.log("createEventThunk emailList", emailList);
      dispatch(createEventUserList(emailList, response.data.id))  

    } catch (error) {
      console.log("Failed to add new event:", error);
    }
  };
};

//ak thunk, will this work?
export const createEventUserList = (emailList, eventId) =>{
  return async (dispatch) =>{
    try{
      // Use Promise.all to wait for all POST requests to complete
        const createUserPromises = emailList?.map((email) => {
          return axios.post("/api/users",  {email, eventId} );
        });

        const createdUsers = await Promise.all(createUserPromises);

        // Dispatch an action for each created user
        createdUsers.forEach((user) => {
          dispatch(_createUser(user.data));
        });
  
        return createdUsers;
      } catch (error) {
        console.error("Error creating users", error);
        // Handle errors and dispatch an error action if needed
      }
    };
  };

  //AK this isn't a thunk but should I move it someplace else?
// const emailInvitedUsers = () =>{


export const updateEventThunk = (event) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const res = await axios.put(`/api/events/${event.id}`, event, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export const addUserToEventThunk = (userId, eventId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/events/${eventId}/addUser/${userId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Server responded with a non-200 status code");
    }

    console.log("Sending request with User ID:", userId, "Event ID:", eventId);

    const data = await response.json();

    if (data.success) {
      dispatch(addUserToEvent({ userId, eventId }));
    } else {
      console.error("Error from server:", data.message);
    }
  } catch (error) {
    console.error("Error adding user to event:", error);
  }
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
    case ADD_USER_TO_EVENT:
      return state.map((event) =>
        event.id === action.payload.eventId
          ? {
              ...event,
              users: [...event.users, action.payload.userId],
            }
          : event
      );

    default:
      return state;
  }
}
