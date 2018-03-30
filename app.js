const express = require('express'),
  app = express(),
  port = 5000 || process.env.PORT,
  ip = process.env.IP,
  exphbs = require('express-handlebars'),
  mongoose = require('mongoose');

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

app.listen(port, () => console.log(`Listening to port ${port}`));