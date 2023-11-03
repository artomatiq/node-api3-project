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
      res.json(req.user);
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.user.id)
      .then (posts => {
          res.status(200).json(posts)
      })
      .catch (next)
});

router.post('/:id/posts', validatePost, validateUserId, (req, res, next) => {
Posts.insert({user_id: req.user.id, text: req.body.text})
  .then (post => {
      res.status(201).json(post[0]);
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
