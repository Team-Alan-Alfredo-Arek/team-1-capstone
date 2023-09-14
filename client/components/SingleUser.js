import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getUser, createUser, updateUser, deleteUser} from "../store";

const SingleUser = (props) => {
   const {user}= props;
  // console.log("userisAdmin? in singleuser", user.isAdmin);
   //const { auth } = useSelector((state) => state);// from techshop UserAccountPage.js, but we're not looking at only logged in user
   const [form, setForm] = useState({
      username: user.username ? user.username : '',
      password: user.password ? user.password : '',
      isAdmin: user.isAdmin ? user.isAdmin : false,
      imageUrl: user.imageUrl ? user.imageUrl : ''
   })
   const dispatch = useDispatch();
   
   //const user = useSelector((state) => state.auth);


    const handleDeleteUser =  (id) => {
      console.log("dispatch handledeleteUser, ID:", id);
      try {
        dispatch(deleteUser(id));
        window.alert("User deleted successfully, redirecting to main page.");
      } catch (error) {
        window.alert("Failed to delete User.", error);
      }
    };


    const handleChange = (event) => {
      const { name, value } = event.target;
      console.log('handlechange name', name)
      setForm({
         ...form,
         [name]:value,   
      })
    }
  
    const handleSubmit=(event)=> {
      event.preventDefault();
      if (!user.id) {
         const newUser = {
            username: form.username,
            password: form.password,
            isAdmin: form.isAdmin,
            imageUrl: form.imageUrl,
          };
          // Dispatch an action or call a function to create the user
          // For example:
          // dispatch(createUser(newUser)); // Assuming you have a createUser action
          dispatch(createUser(newUser));
          // Optionally, reset the form after submission
          setForm({
            username: "",
            password: "",
            isAdmin: false,
            imageUrl: "",
          });
        } else {
          // Updating an existing user

          console.log(" user ID", user.id)
          const updatedUser = {
            id:user.id,
            username: form.username,
            password: form.password,
            isAdmin: form.isAdmin,
            imageUrl: form.imageUrl,
          };
          console.log("updated user ID", updatedUser.id)
          dispatch(updateUser(updatedUser));
    }
   }
    return (
      <div >
        
        {/* <div key={users.user.id} user={user}>
               {user.username}
               <img className="userImage" src={user.imageUrl}/>
               {auth.isAdmin && (
                <button onClick={() => {
                  console.log("userID", user.id);
                  handleDeleteUser(user.id)}}>Delete User</button>
              )}
              </div> */}

      <div>
        {/* <h3>
          {this.props?.location
            ? `Edit ${this.props.campus.name}`
            : "Add A Campus"}
        </h3> */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
            value={form.password}
            onChange={handleChange}
          />
          <label htmlFor="isAdmin">Admin?</label>
          <input
            name="isAdmin"
            checked={form.isAdmin}
            type="checkbox"
            onChange={handleChange}
          />
          <label htmlFor="imageUrl">Image Url</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            type="text"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {(
                <button onClick={() => {
                  console.log("userID", user.id);
                  handleDeleteUser(user.id)}}>Delete User</button>
              )} 
      </div>
      </div>
    );
  };
  
  export default SingleUser;