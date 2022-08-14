// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app

const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//post data
app.post('/addHistory', (req, res)=>{
    // console.log(req.body);
    projectData.splice(0, 0, req.body);
    res.send("Data Received...");
});

//send data
app.get('/all', (req, res)=>{
    // console.log(projectData);
    res.send(projectData);

});

// Setup Server
const port = 8001;
app.listen(port, (req, res)=>{
    console.log(`server listening on port ${port}`)
});