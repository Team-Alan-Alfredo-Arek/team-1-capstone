// Action Types
const SET_AI_RESULTS = 'SET_AI_RESULTS';
const SET_AI_TASKS = 'SET_AI_TASKS';  

// Action Creators
export const setAIResults = (results) => {
  return {
    type: SET_AI_RESULTS,
    results,
  };
};

export const setAITasks = (tasks) => {  
  return {
    type: SET_AI_TASKS,
    tasks,
  };
};

// Thunk Functions
export const fetchAIResults = (event) => async (dispatch) => {
  try {
    const response = await fetch('/api/openai/event-ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setAIResults(data.results));
      return data.results;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    dispatch(setAIResults(null)); 
    throw error;
  }
};

export const fetchAITasks = (event) => async (dispatch) => {
  try {
    const response = await fetch('/api/openai/generate-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setAITasks(data.results));
      return data.results;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    dispatch(setAITasks(null)); 
    throw error;
  }
};

// Initial State
const initialState = {
  aiResults: null,
  aiTasks: null,  
};

// Reducer
const aiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AI_RESULTS:
      return {
        ...state,
        aiResults: action.results,
      };
    case SET_AI_TASKS:  
      return {
        ...state,
        aiTasks: action.tasks,
      };
    default:
      return state;
  }
};

export default aiReducer;
