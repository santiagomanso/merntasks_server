//routes to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');


//create an user
// api/users
router.post('/', 
    [
        check('name', 'username is mandatory').not().isEmpty(),
        check('email', 'please provide a valid email').isEmail(),
        check('password', 'the password must have 6 letters').isLength({ min: 6 })
    ],
    userController.createUser
);
module.exports = router