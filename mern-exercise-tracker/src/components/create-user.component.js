import React, { useState } from "react";
import { toast } from "react-toastify";
import { makeRequest } from "../NetworkLayer/axios";
import { POST_REQUEST } from "../constants/NetworkConstants";
import { toastErrorConfig } from "../helpers/Generichelpers";

const CreateUser = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    console.log(user);

    const response = await makeRequest("users/add", POST_REQUEST, user).catch(
      (error) => {
        toast.error(error.message, toastErrorConfig);
      }
    );
    if (response) {
      toast("User has been created");
    }
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            required
            className="form-control"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
