const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

module.exports = () => {
  // CONNECTION EVENTS
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => console.log('MongoDB Connected...!'))
    .catch(err => {
      console.log(err.message);
      //Exits process with failure;
      process.exit(1);
    });
}


