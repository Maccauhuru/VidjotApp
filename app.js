const express = require('express'),
  app = express(),
  port = 5000 || process.env.PORT,
  ip = process.env.IP,
  exphbs = require('express-handlebars'),
  mongoose = require('mongoose'),
  bodyParser = require("body-parser");

  //Body Parser Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  mongoose.connect('mongodb://localhost/vidjot_db')
  .then(()=>console.log(`MongoDB connected!`))
  .catch((err)=>console.log(err));

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
  res.send('Ideas Page');
});

//Process Ideas Form
app.post('/ideas',(req,res)=>{
let errors = [];
if(!req.body.title){
  errors.push({text : 'Please Add A Title'});
}
if(!req.body.details){
  errors.push({text: 'Please Add Some Details'});
}
if(errors.length > 0){
  res.render('ideas/add',{
    errors:errors,
    title:req.body.title,
    details:req.body.details
  });
} else {
  res.send("Sucessfully Posted!");
}
});

//Define Add Ideas Route
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

app.listen(port, () => console.log(`Listening to port ${port}`));