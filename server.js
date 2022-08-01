// Setup empty JS object to act as endpoint for all routes
projectData = {zipcode:[],feeling:[],date:[],temp:[],Country:[],City:[]};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;

// Setup Server

const server =app.listen(port, listening => {
    console.log('Server Up and running');
    console.log(`running on localhost: ${port}`);
});

////////////////////////////////////////////////////////////
app.post('/add',add);

function add (req,res){

    projectData.zipcode.push(req.body.zipCode);
    projectData.feeling.push(req.body.feeling);
    projectData.date.push(req.body.date);
    projectData.temp.push(req.body.temp);
    projectData.Country.push(req.body.Country);
    projectData.City.push(req.body.City);
    res.send(projectData);
}

// Get ProjectData
app.get('/all', function (request, response) {
    console.log(projectData);
    response.send({...projectData});
  });