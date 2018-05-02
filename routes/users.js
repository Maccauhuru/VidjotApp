const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//const passport = require("passport");
const router = express.Router();

//Load the User model
require("../models/User");
const User = mongoose.model("users");
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
    const newUser = new User({
      name: req.body.name,
      email:req.body.email,
      password:req.body.password
  });
bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(newUser.password, salt, (err, hash) => {
if (err) throw error;
newUser.password = hash;
newUser.save()
.then(user => {
  req.flash(success_msg, "You are now registred!");
  res.redirect("/users/login");
})
.catch(err =>{
  console.log("Registration unsuccessfull..please try again!");
  return;
});
});

});
  }
});
module.exports = router;