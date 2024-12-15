const express = require('express')

//controller functions
const {signupUser, loginUser} = require('../contollers/userController')
const router = express.Router()

//login route
router.post('/login', loginUser)



//Siign up Route
router.post('/signup', signupUser)

module.exports = router