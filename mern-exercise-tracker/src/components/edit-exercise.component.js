import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeRequest } from "../NetworkLayer/axios";
import { GET_REQUEST } from "../constants/NetworkConstants";

const EditExercise = (props) => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const getExercises = async () => {
    const response = await makeRequest(
      "exercises/" + props.match.params.id,
      GET_REQUEST
    );
    setUsername(response.data.username);
    setDescription(response.data.description);
    setDuration(response.data.duration);
    setDate(new Date(response.data.date));
  };

  const getUsers = async() => {
    const response = await makeRequest(
      "users",
      GET_REQUEST
    );
    if (response.data.length > 0) {
      setUsers(response.data.map((user) => user.username));
    }
  }

  useEffect(() => {
    getExercises()
    getUsers()
  }, [props.match.params.id]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    console.log(exercise);

    axios
      .patch(
        "http://localhost:8888/exercises/update/" + props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            class="form-select"
            aria-label="Default select example"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
