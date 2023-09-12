import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../store/users";
//components
//import UserCard from "./UserCard";
import CreateUser from "./CreateUser";


export default function Users(){
   
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);

  const users = useSelector((state) => state.users);

  console.log("users", users);

  const auth = useSelector((state) => state.auth);

  const handleDeleteUser =  (id) => {
   console.log("dispatch handledeleteUser, ID:", id);
   try {
     dispatch(deleteUser(id));
     window.alert("User deleted successfully, redirecting to main page.");
   } catch (error) {
     window.alert("Failed to delete User.", error);
   }
 };
 
  return (
    <div>
      <h1>Users</h1>
      <div id="users">
        <div className="userList">
          <ul>
            {users?.users.map((user) => (
              <div key={user.id} user={user}>
               {user.username}
               <img className="userImage" src={user.imageUrl}/>
               {auth.isAdmin && (
                <button onClick={() => {
                  console.log("userID", user.id);
                  handleDeleteUser(user.id)}}>Delete User</button>
              )}
              </div>
            ))}
          </ul>
        </div>
        <CreateUser addUser={true} />
      </div>
    </div>
  );
};
