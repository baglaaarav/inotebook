const express = require('express');
const User = require('../models/User')
const router = express.Router();
//create a user usign POST , Don't reqire a auth

router.get('/', (req, res) =>{
    console.log(req.body)
    const user = User(req.body)
    user.save()
    res.send('hello')
})

module.exports = router