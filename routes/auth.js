//routes to create users
//route to autenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const cors = require('cors');

//enable cors
const whiteList = '*';
server.use(cors( { origin: whiteList } ));


//Log In
// api/auth
router.post('/', 
    authController.autenticateUser
);

//get authenticated user
router.get('/',
    auth,
    authController.getUser
    );


module.exports = router;