const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//Login Route
router.get("/login", (req, res, next) => {
  const login = "You are Logged";
  res.render("users/login", { login: login });
});

//Register Route
router.get("/register", (req, res, next) => {
  const register = "You are registered";
  res.render("users/register", { register: register });
});

//Register Form POST
router.post("/register", (req, res) => {
  let errors = [];

  if (req.body.password !== req.body.password2) {
    errors.push({ text: "Passwords do not match!" });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: "Password must be at least 4 chars" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    res.send("Passed!");
  }
});

module.exports = router;
