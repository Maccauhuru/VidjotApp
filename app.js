const express = require('express'),
  app = express(),
  port = 5000,
  ip = process.env.IP,
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require("method-override"),
  session = require("express-session"),
  flash = require("connect-flash");

  //Load Route Files
const ideas = require('./routes/ideas');


 mongoose
   .connect('mongodb://localhost/vidjot_DB')
   .then(() => console.log("MongoDB Finally Connected..."))
   .catch(err => console.log(err));



/**************************************************/
/****************MIDDLEWARE************************/
/**************************************************/
//Body Parser Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

// Method Override Middleware
app.use(methodOverride('_method'));

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Express Session Middleware
app.use(
  session({
    secret: "secret",
    resave:true,
    saveUninitialized:true
  })
);

//Flash Connect Middleware
app.use(flash());

//Global Variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

/**************************************************/
/***************EXPRESS ROUTES*********************/
/**************************************************/

//Define Index Route
app.get('/', (req, res) => {
  const title = 'Vidjot App';
  res.render('index',{title : title});
});

// Define About Route
app.get('/about', (req, res) => {
  const subtitle = "This is an App for jotting down your next Youtube video ideas easily!";
  res.render('about',{subtitle:subtitle});
});


//Login Route
app.get('/users/login',(req,res,next)=>{
  const login = 'You are Logged';
  res.render('login',{login:login});
});

//Register Route
app.get("/users/register", (req, res, next) => {
  const register = "You are registered";
  res.render('register',{register:register});
});


/**************************************************/
/**************************************************/

app.use('/ideas', ideas);
app.listen(port, () => console.log(`Listening to port ${port}`));