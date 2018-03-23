const  express       = require('express'),
       app           = express(),
       port          = 5000,
       ip            = process.env.IP;

app.listen(port,()=> console.log(`Listening to port ${port}`));