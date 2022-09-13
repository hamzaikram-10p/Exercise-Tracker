import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeRequest } from "../NetworkLayer/axios";
import { DELETE_REQUEST, GET_REQUEST } from "../constants/NetworkConstants";
import { toast } from "react-toastify";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <button
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

const ExercisesList = (props) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    const response = await makeRequest("exercises", GET_REQUEST);
    setExercises(response.data);
  };

  const deleteExercise = async (id) => {
    const response = await makeRequest("exercises/" + id, DELETE_REQUEST);
    toast("Exercise has been deleted");
    setExercises(exercises.filter((el) => el._id !== id));
  };

  const exerciseList = () => {
    return exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
