var jwt = require('jsonwebtoken');

const JWT_SECRET = "thisWebAPPIsCreatedByAaravBagla"
const fetchuser = (req, res, next) => {
    //get the user from the hwt token
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Please authanticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authanticate using a valid token" })
    }


}


module.exports = fetchuser