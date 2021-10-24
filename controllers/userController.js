const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res)=>{

    //check for errors from express validation
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() })
    }


    //destructuring of the body
    const {email, password} = req.body;



    try {
        //validate uniqueness of user
        let user = await User.findOne({ email });
            if (user){
                return res.status(400).json({ msg: 'user already exists' });
            }

        //create new user
        user = new User(req.body);

            //diferencia entre Clase y Objeto
        

        //password hashing
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        
            //what are promises and callbacks
        
        //save stanciated new user
        await user.save();

        //create and sign JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        //sign token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 36000 //1hr 
        }, (error, token)=> {
            if (error) throw error;
              //confirmation msg
           return res.json({ token });
        } );


      


    } catch (error) {
        console.log(error)
        console.log(errors)
        res.status(400).send('there was an error');
    }
}