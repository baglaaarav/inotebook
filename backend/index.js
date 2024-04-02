const connectToMongo = require("./db")
const express = require('express')

connectToMongo();
var cors = require('cors')
const app = express()
app.use(cors())

const port = 4000
app.use(express.json())

 app.get("/", (req, res) => { res.send("Express on Vercel"); });



//avilable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port)
// ... (previous code) module.exports = app; // Export the Express app