// Action Types
const SET_AI_RESULTS = 'SET_AI_RESULTS';

// Action Creators
export const setAIResults = (results) => {
  return {
    type: SET_AI_RESULTS,
    results,
  };
};

// Thunk Function
export const fetchAIResults = (event) => async (dispatch) => {
  try {
    console.log('About to fetch from /api/openai');
    const response = await fetch('/api/openai', {
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
    dispatch(setAIResults(null));  // Or handle this in another way in your state
    throw error;
  }
};


// Initial State
const initialState = {
  aiResults: null,
};

// Reducer
const aiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AI_RESULTS:
      return {
        ...state,
        aiResults: action.results,
      };
    default:
      return state;
  }
};

export default aiReducer;
