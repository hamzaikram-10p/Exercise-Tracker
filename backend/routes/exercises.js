const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Exercise = require("../models/exercise.model");
const authenticateToken = require("../middlewares/authenticateToken");
router.get("/", authenticateToken, (req, res) => {
  Exercise.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(400).json("Error: " + e);
    });
});

router.post("/add", (req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const user = new Exercise({ username, description, duration, date });
  user
    .save()
    .then(() => {
      res.status(200).json("Exercise saved successfully");
    })
    .catch((e) => res.status(400).json("Error: " + e));
});

router.get("/:id", (req, res) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isIdValid) return res.status(404).json("Please enter a valid id");
  Exercise.findById(req.params.id)
    .then((exercise) => {
      if (exercise) {
        res.status(200).json(exercise);
      } else {
        res.status(404).json("Record not found");
      }
    })
    .catch((e) => {
      res.status(400).json("Error: " + e);
    });
});

router.delete("/:id", (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json("Exercise deleted successfully");
    })
    .catch((e) => {
      res.status(400).json("Error: " + e);
    });
});

router.patch("/update/:id", (req, res) => {
  Exercise.findByIdAndUpdate(
    { _id: req.params.id },
    {
      username: req.body.username,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date,
    }
  )
    .then((exercise) => {
      res.status(200).json("Exercise update successfull");
    })
    .catch((e) => {
      res.status(400).json("Error: " + e);
    });
});

module.exports = router;
