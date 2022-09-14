import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { makeRequest } from "../NetworkLayer/axios";
import { POST_REQUEST } from "../constants/NetworkConstants";
import { toast } from "react-toastify";
import { toastErrorConfig } from "../helpers/Generichelpers";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const user = {
        username: username,
        password: password,
      };
      const response = await makeRequest("users/login", POST_REQUEST, user);
      const cookies = new Cookies();
      cookies.set("token", response.data.accessToken, { path: "/" });
      window.location = "/exerciseList";
    } catch (e) {
        toast.error("Username or password is incorrect", toastErrorConfig);
    }finally{
        setIsSubmitting(false);
    }
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
          {isSubmitting ? (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          ) : (
            <input type="submit" value="Login" className="btn btn-primary" />
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
