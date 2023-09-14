const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
module.exports = app

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// For the root URL, send the HTML file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// For any other routes, also send the HTML file so the client can handle them
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
