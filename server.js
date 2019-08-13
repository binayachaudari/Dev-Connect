const express = require('express');
const app = express();

const connectDB = require('./db');

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

app.get('/', (req, res) => {
  res.send('WELCOME TO SERVER!');
});

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