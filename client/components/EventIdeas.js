import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAIResults } from '../store/ai'; 

const EventIdeas = () => {
    const dispatch = useDispatch();
    const aiResults = useSelector((state) => state.ai.aiResults);
  
    useEffect(() => {
      dispatch(fetchAIResults('Thanksgiving Dinner'))
        .then((result) => { 
        })
        .catch((error) => { 
        });
    }, [dispatch]);
  
    console.log('Rendering with aiResults:', aiResults);  
  
    return (
      <div>
        {aiResults ? (
          <div>
            <p>{JSON.stringify(aiResults)}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };

export default EventIdeas;
