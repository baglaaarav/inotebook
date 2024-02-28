const express = require('express');
const User = require('../models/User')
const router = express.Router();
//create a user usign POST , Don't reqire a auth to createUser
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min:5, max:10}),
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Enter atleast 5 digit password').isLength({min:5})
], async(req, res) =>{

    //If there are errors, return Bad request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) { 
        return res.status(400).json({error : error.array()});
    }

    try{
    //check whether the user exits already
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({error: "User alredy exists"})
        }


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user)
    }catch(error){
        console.log(error.message)
        res.status(500).send("some error occured")
    }   
    
    // .then(user => res.json(user)).catch(err=> {console.log(err)
    //     res.json({error: 'Please enter a unique value for email', message: err.message})})
})

module.exports = router