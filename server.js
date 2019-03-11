require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./api/api');

const port = process.env.PORT || 5000;
const mongoDbUrl = process.env.MONGODB_URL;

const app = express();

mongoose.connect(mongoDbUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback () {
  console.log(`Connected to MongoDB`);
});

app.use(bodyParser.json({ strict:false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

const reactIndex = (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
}

app.get('/', reactIndex);
app.get('/*', reactIndex);

app.listen(port, () => console.log(`Hello World listening on port ${port}`));
