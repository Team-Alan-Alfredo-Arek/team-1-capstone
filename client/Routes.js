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
import EventIdeas from "./components/EventIdeas";
import SingleEventDetails from "./components/SingleEventDetails";
import FunRecipes from "./components/Recipes";
import ChatComponent from "./components/Chat";
import SingleUser from "./components/SingleUser";
import Profile from "./components/Profile";
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
            <Route exact path="/users" component={Users} />
            <Route path="/users/:id" component={SingleUser} />
            <Route path="/recipes" component={FunRecipes} />
            <Route path="/profile" component={Profile} />
            <Route path="/chat" component={ChatComponent} />

            <Route path="/eventideas" component={EventIdeas} />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={GuestHome} />
            <Route path="/login" component={Login} />
            <Route path="/signup/:emailParam" component={Signup} />
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
