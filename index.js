
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//create server
const server = express();

//connect DB
connectDB();

//enable CORS
server.use(
    cors({
        origin: "*",
    })
)

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