import React from "react";
import { connect } from "react-redux";
//actions
import {
  createUser,
  getUsers,
  updateUser,
} from "../store/users";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAdmin: "",
      imageUrl: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.addUser) {
      this.setState({
         username: "",
         password: "",
         isAdmin: "",
         imageUrl: "",
      });
    } else {
      this.props.getUsers(this.props.location.pathname.split("/")[2]);
    }
  }

  componentDidUpdate() {
    if (
      !this.props.addUser &&
      this.state.name === "" &&
      this.state.address === "" &&
      this.state.isAdmin === "" &&
      this.state.imageUrl === ""
    ) {
      this.setState(this.props.user);
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Handlesubmit this.props?.user?.id)", this.props?.user?.id); //AK check
    if (!this.props?.user?.id) {
      this.props.createUser(this.state);
      this.setState({
        username: "",
        password: "",
        isAdmin: "",
        imageUrl: "",
      });
    } else {
      this.props.updateUser(this.state);
    }
  }

  render() {
    const { username, password, isAdmin, imageUrl } = this.state;

    return (
      <div
        className={
          this.props?.location ? "user edit form" : "user add form"
        }
      >
        <h3>
          {this.props?.location
            ? `Edit ${this.props.user.username}`
            : "Add A User"}
        </h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            username="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
            value={password}
            onChange={this.handleChange}
          />
          <label htmlFor="isAdmin">Is Admin?</label>
          <input
            name="isAdmin"
            value={isAdmin}
            type="checkbox"
            onChange={this.handleChange}
          />
          <label htmlFor="imageUrl">Image Url</label>
          <input
            name="imageUrl"
            value={imageUrl}
            type="text"
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
    getUsers: (id) => dispatch(getUsers(id)),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
