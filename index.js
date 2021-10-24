
const express = require('express');
const connectDB = require('./config/db');


//create server
const server = express();

//connect DB
connectDB();



//enable express.json 
server.use(express.json({ extended: true }))

//create port
const PORT = process.env.port || 4000;

//import routes
server.use('/api/users', require('./routes/users'));
server.use('/api/auth', require('./routes/auth'));
server.use('/api/projects', require('./routes/projects'));
server.use('/api/tasks', require('./routes/tasks'));

//start server
server.listen(PORT, ()=> {
    console.log(`The server is currently running on the port:${PORT}`);
})