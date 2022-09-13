import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeRequest } from "../NetworkLayer/axios";
import { DELETE_REQUEST, GET_REQUEST } from "../constants/NetworkConstants";
import { toast } from "react-toastify";

const User = (props) => (
  <tr>
    <td>{props.user.username}</td>

    <td>
      <Link to={"/useredit/" + props.user._id}>edit</Link> |{" "}
      <button
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await makeRequest("users/", GET_REQUEST).catch((error) => {
      console.log(error);
    });
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const response = await makeRequest("users/" + id, DELETE_REQUEST);
    toast("User has been deleted");
    setUsers(users.filter((el) => el._id !== id));
  };

  const exerciseList = () => {
    return users.map((user) => {
      return <User user={user} deleteUser={deleteUser} key={user._id} />;
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default UsersList;
