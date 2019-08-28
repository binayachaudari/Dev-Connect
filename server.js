const express = require('express');
const app = express();

const connectDB = require('./db');
const path = require('path');

const PORT = process.env.PORT || 5000;

/**
 * Connect to Database
 */
connectDB();

/** 
 * Inbuild Middleware
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/**
 * Routing Middleware
 */
app.use('/api', require('./routes/api'));


/**
 * Server static in production
 */
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

/**
 * Application Middleware
 */
app.use((req, res, next) => {
  res.status(404);
  next({
    status: 404,
    message: '404 page not found'
  })
})

/**
 * Error Handling Middleware
 */
app.use((err, req, res, next) => {
  res.status(err.status || 400);
  res.json({
    status: err.status,
    message: err.message
  });
});

/** 
 * Start Server
 */
app.listen(PORT, () => {
  console.log(`Server Started, Listening to port ${PORT}`);
})