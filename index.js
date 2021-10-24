
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//create server
const server = express();

//enable CORS
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });

//connect DB
connectDB();



//enable express.json 
server.use(express.json({ extended: true }))

//create port
const port = process.env.port || 4000;

//import routes
server.use('/api/users', require('./routes/users'));
server.use('/api/auth', require('./routes/auth'));
server.use('/api/projects', require('./routes/projects'));
server.use('/api/tasks', require('./routes/tasks'));

//start server
server.listen(port, '0.0.0.0' , ()=> {
    console.log(`The server is currently running on the port:${port}`);
})