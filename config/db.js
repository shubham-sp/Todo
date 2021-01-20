const config = require('config');
const mongoose = require('mongoose');
const db = config.get('mongoURI');

const connectDB = async () =>{

  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });

    console.log("Mongoose Connect..");
  }catch (err) {
    console.error(err.message);
    //exit process with error
    process.exit(1);
  }
}

module.exports = connectDB;
