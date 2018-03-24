const  express       = require('express'),
       app           = express(),
       port          = 5000 || process.env.PORT,
       ip            = process.env.IP;

       //Define Index Route

       app.get('/',(req,res)=>{
         res.send("Home Page Created!");
       });


    // Define About Route
    app.get('/about',(req,res)=>{
      res.send("About Page Created!");
    });

app.listen(port,()=> console.log(`Listening to port ${port}`));