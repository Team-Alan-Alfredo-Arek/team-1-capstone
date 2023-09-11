import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import GuestHome from "./components/guestHome";
import CreateEvent from "./components/CreateEvent";
import Events from "./components/Events";
import { me } from "./store";
import Task from "./components/Task";
import Users from "./components/Users";
import SingleEventDetails from "./components/SingleEventDetails";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/events" component={Events} />
            <Route path="/events/:id" component={SingleEventDetails} />
            <Route path="/createevent" component={CreateEvent} />
            <Route path="/tasks" component={Task} />
            <Route path="/users" component={Users} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={GuestHome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
