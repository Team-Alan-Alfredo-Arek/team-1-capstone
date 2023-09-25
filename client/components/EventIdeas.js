import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAIResults, getSingleEventThunk } from "../store";

const EventIdeas = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );

  const aiResults = useSelector((state) => state.ai.aiResults);

  useEffect(() => {
    if (id) {
      dispatch(getSingleEventThunk(id)).then(() => {
        if (event) {
          dispatch(fetchAIResults(event.name))
            .then((result) => {})
            .catch((error) => {});
        }
      });
    }
  }, [dispatch, id, event]);

  return (
    <div>
        {aiResults ? (
            <div>
                <p>{aiResults.text}</p>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
);
};

export default EventIdeas;
