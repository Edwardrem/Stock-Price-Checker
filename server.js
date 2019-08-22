'use strict';

const express     = require('express');
const cors        = require('cors');
const helmet      = require('helmet'); 

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

const app = express();

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", 'glitch.com'],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'button.glitch.me'],
    styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'button.glitch.me'],
    fontSrc: ['fonts.gstatic.com', 'cdnjs.cloudflare.com'],
    imgSrc: ['cdn.glitch.com', 's3.amazonaws.com', 'glitch.com'],
    connectSrc: ['api.glitch.com']
  }
}));

app.use(express.static('public'))

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.use((error, request, response, next) => {
  return response.status(error.status || 500).json({
    error: error.message || 'invalid URL'
  });
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(err) {
          console.log('Tests are not valid:', err);
      }
    }, 3500);
  }
});

module.exports = app; //for testing