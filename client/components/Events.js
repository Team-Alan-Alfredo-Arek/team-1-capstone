import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEventsThunk } from '../store/events';
import { Link } from 'react-router-dom';

const Events = () => {
        const events = useSelector((state) => state.events);
        const dispatch = useDispatch();

        // console.log(events)
    
    useEffect(() => {
        dispatch(getEventsThunk());
    }, [dispatch]);

    return (
        <div>
        <h1>Events</h1>
        {events?.map((event) => (
            <div key={event?.id}>
            <h3>{event?.name}</h3>
            <p>{event?.description}</p>
            </div>
        ))}
        </div>
    );
    }



export default Events;