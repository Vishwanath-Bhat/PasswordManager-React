const express = require('express')
require('dotenv').config()


const bodyParser = require('body-parser')
const cors = require('cors')

const userRoutes = require('./routes/user')
const passwordRoutes = require('./routes/passwords')
const mongoose = require('mongoose')



const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())



app.use('/api/user', userRoutes)
app.use('/api/password', passwordRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log('connected to db & listening on port', port)
    })
  })
  .catch((error) => {
    console.log(error)
  })
