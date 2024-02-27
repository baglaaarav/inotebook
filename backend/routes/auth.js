const express = require('express');
const User = require('../models/User')
const router = express.Router();
//create a user usign POST , Don't reqire a auth
const { body, validationResult } = require('express-validator');

router.post('/', [
    body('name', 'Enter a valid name').isLength({min:5, max:10}),
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Enter atleast 5 digit password').isLength({min:5})
], (req, res) =>{
    const error = validationResult(req);
    if (!error.isEmpty()) { 
        return res.status(400).json({error : error.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user)).catch(err=> {console.log(err)
        res.json({error: 'Please enter a unique value for email', message: err.message})})
})

module.exports = router