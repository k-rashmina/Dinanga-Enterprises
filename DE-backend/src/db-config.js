const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
const db = process.env.MONGODB_URI;

mongoose.set('strictQuery', true, 'useNewUrlParser', true);

const dbConnect = async() => {
  try{  
    await mongoose.connect(db);
    console.log('Database is connected');
  }catch (err){
    console.error(err);
    process.exit(1);
  }
}

module.exports = dbConnect;