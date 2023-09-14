
  

  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { useSelector, useDispatch } from "react-redux";
  import { getUser, updateUser, deleteUser } from "../store";
  
  const SingleUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      dispatch(getUser(id));
    }, [dispatch, id]);
  
    useEffect(() => {
      setUser(user); // Set the user data here when it's fetched
    }, [user]);
  
    const handleDeleteUser = (id) => {
      console.log("dispatch handleDeleteUser, ID:", id);
      try {
        dispatch(deleteUser(id));
        window.alert("User deleted successfully, redirecting to main page.");
      } catch (error) {
        window.alert("Failed to delete User.", error);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setUser({
        ...user,
        [name]: value,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!user) {
        // Handle creating a new user here
        // You should dispatch the action to create a user
        // You can access user.username, user.password, user.isAdmin, etc. here
      } else {
        dispatch(updateUser(user)); // Dispatch the action to update the user
      }
    };
  
    return (
      <div>
        {user && (
          <div>
            <h3>Edit {user.username}</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">User Name</label>
              <input
                name="username"
                type="text"
                value={user.username}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="text"
                value={user.password}
                onChange={handleChange}
              />
              <label htmlFor="isAdmin">Admin?</label>
              <input
                name="isAdmin"
                value={user.isAdmin}
                type="checkbox"
                onChange={handleChange}
              />
              <label htmlFor="imageUrl">Image Url</label>
              <input
                name="imageUrl"
                value={user.imageUrl}
                type="text"
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
            <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
          </div>
        )}
      </div>
    );
  };
  
  export default SingleUser;
  