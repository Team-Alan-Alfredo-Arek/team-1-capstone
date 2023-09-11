import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {createUser,getUsers,updateUser,deleteUser} from "../store/users";

const CreateUser = () => {
   const dispatch = useDispatch();

   const [newUser, setNewUser] = useState({
      username: "",
      password: "",
      isAdmin: false,
      imageUrl: "",
    });

  const handleChange = (ev) => {
   setNewUser({ ...newUser, [ev.target.name]: ev.target.value });
   };

   const addNewUser = (ev) => {
      ev.preventDefault();
      try {
      dispatch(createUser(newUser));
      window.alert("New User added");
      } catch (error) {
      window.alert("Error adding new product");
      }
   };


//   render() {
//     const { username, password, isAdmin, imageUrl } = this.state;

    return (
      <div> 
        <form onSubmit={addNewUser}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            value={newUser.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
            value={newUser.password}
            onChange={handleChange}
          />
          <label htmlFor="isAdmin">Is Admin?</label>
          <input
            name="isAdmin"
            value={newUser.isAdmin}
            type="checkbox"
            onChange={handleChange}
          />
          <label htmlFor="imageUrl">Image Url</label>
          <input
            name="imageUrl"
            value={newUser.imageUrl}
            type="text"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }


export default CreateUser;
