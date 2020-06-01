require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const { LVS, LIS, PORT } = process.env;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/videos', express.static(__dirname + LVS));
app.use('/images', express.static(__dirname + LIS));
app.use(express.static(path.join(__dirname, '../front-end/build')));

app.use('/api', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../front-end/build/index.html'));
});

app.listen(PORT, function () {
  console.log('************************************');
  console.log('***HTTP Listening on port %s...***', PORT);
  console.log('************************************');
});
