import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { makeRequest } from "../NetworkLayer/axios";
import { POST_REQUEST } from "../constants/NetworkConstants";

const Login = (props) => {
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

    const response = await makeRequest("users/login", POST_REQUEST, user);
    const cookies = new Cookies();
    cookies.set("token", response.data.accessToken, { path: "/" });
    console.log(response.data);
    window.location = "/exerciseList";
  };

  return (
    <div>
      <h3>Login</h3>
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
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default Login;
