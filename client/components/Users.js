import React from "react";
import { connect } from "react-redux";
//components
//import UserCard from "./UserCard";
import CreateUser from "./CreateUser";

const Users = (props) => {
  const { users } = props;

  return (
    <div>
      <h1>Users</h1>
      <div id="users">
        <div className="userList">
          <ul>
            {users.map((user) => (
              <div key={user.id} user={user}>
               {user.username}
               <img src={user.imageUrl}></img>

              </div>
            ))}
          </ul>
        </div>
        <CreateUser addUser={true} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps)(Users);
