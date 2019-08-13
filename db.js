const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

module.exports = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
    .then(() => console.log('MongoDB Connected...!'))
    .catch(err => {
      console.log(err.message);
      //Exits process with failure;
      process.exit(1);
    });
}


