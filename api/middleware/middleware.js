const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`
  *****
  you have made a ${req.method} request
  *****
  ${req.baseUrl}
  ${new Date().getTime()}
  `);
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then (user => {
      if (!user) {
        next({
          status: 404,
          message: `user not found`
        })
      }
      else {
        req.user = user
        next();
      }
    })
    .catch ((error)=> {
      next(error);
    })
    
}

function validateUser(req, res, next) {
  if (req.body.name) {
    next()
  }
  else {
    next({
      status: 400,
      message: 'missing required name'
    })
  }
}

function validatePost(req, res, next) {
  if (req.body.text) {
    next();
  }
  else {
    next({
      status: 400,
      message: 'missing required text'
    })
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}