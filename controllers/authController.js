const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.autenticateUser = async (req, res) => {
    
        //check for errors from express validation
        const errors = validationResult(req);
         if ( !errors.isEmpty() ){
             return res.status(400).json({ errors: errors.array() })
         }


        //password and email extraction
        const {email, password} = req.body;

        try {            
            //check for existing user
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({ msg: 'The user dosent exist' });
            }

            //check password
            const correctPass = await bcryptjs.compare(password, user.password)
            if (!correctPass){
                return res.status(400).json({ msg: 'incorrect password' })
            }

         //if everything is OK
            //create and sign JWT
            const payload = {
                user: {
                    id: user.id
                }
            }

            //sign token
            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 3600 //1hr 
            }, (error, token)=> {
                if (error) throw error;
                //confirmation msg
                res.json({ token });
            } );

            } catch (error) {
                console.log(error);
            }

}

//get authenticated user
exports.getUser = async (req,res) => {

        try {
            
            const user = await User.findById(req.user.id).select('-password');
            res.json({ user });

        } catch (error) {
            res.status(500).json({ msg: 'There was a new error' })
        }

}