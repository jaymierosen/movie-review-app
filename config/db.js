const mongoose = require('mongoose');
const config = require('config');
// call the mongoURI value in default.json file
const db = config.get('mongoURI');

// connect to mongoDB
const connectDB = async () => {
   try {
      // returns a promise
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
		  });
      console.log('mongoDB connected');
   } catch(err) {
      // get message from error
      console.error(err.message);
      // exit process with fail
      process.exit(1);
   }
};

module.exports = connectDB;