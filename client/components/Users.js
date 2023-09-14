import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../store/users";
import CreateUser from "./CreateUser";
import SingleUser from "./SingleUser";

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
               <SingleUser key = {user.id} user = {user}/>
            ))}
          </ul>
        </div>
        <CreateUser addUser={true} />
      </div>
    </div>
  );
};
