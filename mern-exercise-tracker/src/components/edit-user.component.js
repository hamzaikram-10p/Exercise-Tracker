import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeRequest } from "../NetworkLayer/axios";
import { GET_REQUEST, PATCH_REQUEST } from "../constants/NetworkConstants";
import { toast } from "react-toastify";

const EditUser = (props) => {
  const [username, setUsername] = useState(props.username);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const getUser = async () => {
    const response = await makeRequest(
      "users/" + props.match.params.id,
      GET_REQUEST
    ).catch((error) => {
      console.log(error);
    });
    setUsername(response.data.username);
  };

  useEffect(() => {
    getUser();
  }, [props.match.params.id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
    };

    console.log(user);
    const response = makeRequest(
      "users/update/" + props.match.params.id,
      PATCH_REQUEST,
      user
    );
    toast("User has been updated");
  };

  return (
    <div>
      <h3>Edit User</h3>
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
          <input type="submit" value="Edit User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
