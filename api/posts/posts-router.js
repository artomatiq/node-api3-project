const express = require('express')
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')


const router = express.Router()


module.exports = router