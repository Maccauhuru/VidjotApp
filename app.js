const express = require('express'),
  app = express(),
  port = 5000,
  ip = process.env.IP,
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

 mongoose
   .connect('mongodb://localhost/vidjot_DB')
   .then(() => console.log("MongoDB Finally Connected..."))
   .catch(err => console.log(err));

//Body Parser Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //Load the Idea Model
  require ('./models/Idea');
  const Idea = mongoose.model('ideas');

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

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

//Define Ideas Route
app.get('/ideas',(req,res)=>{
  Idea.find({})
  .sort({date:'desc'})
  .then(ideas =>{
    res.render('ideas/index',{ideas:ideas});
  });
});

//Process Ideas Form
app.post("/ideas", (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }

  if (errors.length > 0) {
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newIdea = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newIdea).save().then(idea => {
      res.redirect("/ideas");
    });
  }
});

//Define Add Ideas Route
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

app.listen(port, () => console.log(`Listening to port ${port}`));