import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import UsersList from "./components/users-list.component";
import EditUser from "./components/edit-user.component";
import Login from "./components/login.component";

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Login} />
        <Route path="/exerciseList" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/createuser" component={CreateUser} />
        <Route path="/users" component={UsersList} />
        <Route path="/useredit/:id" component={EditUser} />
      </div>
    </Router>
  );
}

export default App;
