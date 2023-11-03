const express = require('express');
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then (users => {
      res.status(200).json(users)
    })
    .catch (next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then (user => {
      res.json(user)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then (updatedUser => {
      res.json(updatedUser)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.user.id)
    .then (() => {
      console.log(req.user)
      res.json(req.user);
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  console.log('get posts request initiated')
  Users.getUserPosts(req.user.id)
      .then (posts => {
          console.log('these are the posts', posts)
          res.status(200).json(posts)
      })
      .catch (next)
});

router.post('/:id/posts', validatePost, validateUserId, (req, res, next) => {
// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
console.log('post posts request initiated')
Posts.insert({user_id: req.user.id, test: req.body.text})
  .then (post => {
      res.json(post);
  })
  .catch(next)
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: (error.message || 'error in users router'),
    stack: error.stack
  });
}); 

module.exports = router
