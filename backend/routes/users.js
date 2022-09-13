const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(400).json("Error: " + e);
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      res.status(400).json("Error: " + e);
    });
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    user = user.toObject();
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    delete user.password;
    if (comparePassword) {
      const jwtToken = await jwt.sign({ user }, process.env.JWT_SECRET_KEY);
      user.accessToken = jwtToken;
      res.status(200).json(user);
    } else {
      res.status(403).json("Username or password is incorrect");
    }
  } else {
    res.status(403).json("Username or password is incorrect");
  }
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("password", username);

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    const user = new User({ username, password: hash });
    user
      .save()
      .then(() => {
        res.status(200).json("User saved successfully");
      })
      .catch((e) => res.status(400).json("Error: " + e));
  });
});

router.patch("/update/:id", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { username: req.body.username }
  )
    .then((user) => {
      res.status(200).json("User update successfull");
    })
    .catch((e) => {
      res.status(400).json("Error: " + e);
    });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.status(200).json("User deleted successfull");
    })
    .catch((e) => {
      res.status(400).json("Error: " + e);
    });
});

module.exports = router;
