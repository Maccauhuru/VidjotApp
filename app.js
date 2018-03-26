const express = require('express'),
  app = express(),
  port = 5000 || process.env.PORT,
  ip = process.env.IP,
  exphbs = require('express-handlebars');

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
  res.render('about');
});

app.listen(port, () => console.log(`Listening to port ${port}`));