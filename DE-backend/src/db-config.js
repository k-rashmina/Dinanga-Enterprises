const mongoose = require('mongoose');
const db = "mongodb+srv://G13:db1234@de-cluster.qbspofl.mongodb.net/?retryWrites=true&w=majority&appName=DE-Cluster";

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