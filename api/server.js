const express = require('express');
const morgan = require('morgan')
const Users = require('./users/users-router');
const Posts = require('./posts/posts-router');
const {logger} = require('./middleware/middleware')

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(logger)
server.use('/api/users', Users)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res) => {
  res.status(404).json({
    message: `${req.method} request to ${req.baseUrl} not found`
  })
})

module.exports = server;
