const connectToMongo = require("./db")
const express = require('express')

connectToMongo();
var cors = require('cors')
const app = express()
app.use(cors())


const port = 4000
app.use(express.json())
//avilable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port)
