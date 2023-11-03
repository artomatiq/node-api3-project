const express = require('express')
const {validateUserId, validatePost} = require('../middleware/middleware')
const Posts = require('./posts-model');


const router = express.Router()



router.use((error, req, res, next) => {
    console.log('this is the posts router error 500')
    res.status(error.status || 500).json({
        message: (error.message || 'error in users router')
    });
}); 

module.exports = router