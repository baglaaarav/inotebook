const express = require('express');
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');

const JWT_SECRET = "thisWebAPPIsCreatedByAaravBagla"
var jwt = require('jsonwebtoken');

const fetchuser = require('../middleware/fetchUser');
//create a user usign POST , Don't reqire a auth to createUser
const { body, validationResult } = require('express-validator');

//ROUTE 1 : helps to route from the traffic of /createuser to post what will happen in that case
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 4, max: 10 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Enter atleast 5 digit password').isLength({ min: 4 })
], async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({success, error: error.array() });
    }

    try {

        //creating the salt for the password and await is for to resolve the first line here and then run the next code
        const salt = await bcrypt.genSalt(10)
        //creating the hash code with that salt and storing that inside the secPass varible
        const secPass = await bcrypt.hash(req.body.password, salt)


        //check whether the user exits already findOne will help to check if that user with same email already exits or not 
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "User alredy exists" })
        }
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user:{
                id: user.id
            }
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        success = true;

        res.json({success, authToken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }







    // .then(user => res.json(user)).catch(err=> {console.log(err)
    //     res.json({error: 'Please enter a unique value for email', message: err.message})})
})
// ROUTE 2 : Authenticate a User using /POST "/api/auth/login". No longer required 

router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password can not be blank").exists()
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" })
        }
        const passwordCom = await bcrypt.compare(password, user.password);

        if (!passwordCom) {
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user:{
                id: user.id
            }
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        success = true;

        res.json({ success, authToken })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internel server error")
    }


})


//ROUTE 3 : Get logged in  User detail /POST "/api/auth/getuser". Logged in required 

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)


    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }

})

module.exports = router