import axios from 'axios'

const CREATE_EVENT = 'CREATE_EVENT'
const GET_EVENTS = 'GET_EVENTS'
const GET_EVENT = 'GET_EVENT'
const UPDATE_EVENT = 'UPDATE_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'

//action creators
const createEvent = event => ({type: CREATE_EVENT, event})
const getEvents = events => ({type: GET_EVENTS, events})
const getEvent = event => ({type: GET_EVENT, event})
const updateEvent = event => ({type: UPDATE_EVENT, event})
const deleteEvent = () => ({type: DELETE_EVENT})


//thunks
export const createEventThunk = event => async dispatch => {
  try {
    const {data} = await axios.post('/api/events', event)
    dispatch(createEvent(data))
  } catch (error) {
    console.log(error)
  }
}

export const getEventsThunk = () => async dispatch => {
    try {
        const {data} = await axios.get('/api/events')
        dispatch(getEvents(data))
    } catch (error) {
        console.log(error)
    }
}

export const getEventThunk = (id) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/events/${id}`)
        dispatch(getEvent(data))
    } catch (error) {
        console.log(error)
    }
}

export const updateEventThunk = (id, event) => async dispatch => {
    try {
        const {data} = await axios.put(`/api/events/${id}`, event)
        dispatch(updateEvent(data))
    } catch (error) {
        console.log(error)
    }
}

export const deleteEventThunk = (id) => async dispatch => {
    try {
        await axios.delete(`/api/events/${id}`)
        dispatch(deleteEvent())
    } catch (error) {
        console.log(error)
    }
}

//reducers

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_EVENT: return action.event
    case GET_EVENTS: return action.events
    case GET_EVENT: return action.event
    case UPDATE_EVENT: return action.event
    case DELETE_EVENT: return {}
    default:
      return state
  }
}

