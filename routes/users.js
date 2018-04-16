const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//Login Route
router.get('/login',(req,res,next)=>{
  const login = 'You are Logged';
  res.render('login',{login:login});
});

//Register Route
router.get("/register", (req, res, next) => {
  const register = "You are registered";
  res.render('register',{register:register});
});


module.exports = router;
