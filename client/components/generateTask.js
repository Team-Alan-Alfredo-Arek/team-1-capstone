import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAITasks, getSingleEventThunk } from "../store";

const GenerateTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );

  const aiTasks = useSelector((state) => state.ai.aiTasks);

  useEffect(() => {
    if (id) {
      dispatch(getSingleEventThunk(id)).then(() => {
        if (event) {
          dispatch(fetchAITasks(event.name))
            .then((result) => {})
            .catch((error) => {});
        }
      });
    }
  }, [dispatch, id, event]);

  console.log("Rendering with aiTasks:", aiTasks);

  return (
    <div>
      {aiTasks ? (
        <div>
          <p>{JSON.stringify(aiTasks)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GenerateTask;
