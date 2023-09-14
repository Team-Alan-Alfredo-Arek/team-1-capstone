import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getUser, deleteUser} from "../store";

const SingleUser = () => {
   const {id} = useParams();
   const [user, setUser] = useState(null);

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


    const handleChange = () => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
  
    const handleSubmit=(event)=> {
      event.preventDefault();
      if (!this.props?.student?.id) {
        this.props.createStudent(this.state);
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          imageUrl: "",
          gpa: 0.0,
        });
      } else {
        this.props.updateStudent(this.state);
      }
    }
    return (
      <div >
        
        <div key={users.user.id} user={user}>
               {user.username}
               <img className="userImage" src={user.imageUrl}/>
               {auth.isAdmin && (
                <button onClick={() => {
                  console.log("userID", user.id);
                  handleDeleteUser(user.id)}}>Delete User</button>
              )}
              </div>

              <div
        className={
          this.props?.location ? "campus edit form" : "campus add form"
        }
      >
        <h3>
          {this.props?.location
            ? `Edit ${this.props.campus.name}`
            : "Add A Campus"}
        </h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            name="address"
            type="text"
            value={address}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            name="description"
            value={description}
            type="text"
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
      </div>
    );
  };
  
  export default SingleUser;
  

