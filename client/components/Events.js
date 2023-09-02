import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEventsThunk } from '../store/events';

const Events = (props) => {
    const { events, getEvents } = props;
    
    useEffect(() => {
        getEvents();
    }, []);
    
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

const mapStateToProps = (state) => {
    return {
        events: state.events,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: () => dispatch(getEventsThunk()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);