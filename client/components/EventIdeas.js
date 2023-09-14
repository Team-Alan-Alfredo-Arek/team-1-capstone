import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAIResults } from '../store/ai'; 

const EventIdeas = () => {
    const dispatch = useDispatch();
    const aiResults = useSelector((state) => state.ai.aiResults);
  
    useEffect(() => {
      console.log('Fetching AI results for Thanksgiving Dinner');  
      dispatch(fetchAIResults('Thanksgiving Dinner'))
        .then((result) => {
          console.log('Fetched AI results:', result);  
        })
        .catch((error) => {
          console.log('Error fetching AI results:', error); 
        });
    }, [dispatch]);
  
    console.log('Rendering with aiResults:', aiResults);  
  
    return (
      <div>
        {aiResults ? (
          <div>
            <p>{aiResults}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };

export default EventIdeas;
