const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./db-config');
const routes = require('./routes');


//initialization and middleware
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(cors(['http://localhost:5173/*']));
app.use(express.json({limit: '15mb'}));
app.use('/', routes);


//db connection

//routes
app.get('/', (req, res) => {
  res.send("Hello World!");
});





app.listen(port, () => {
  console.log(`listening on port ${port}`)
  dbConnect();
});