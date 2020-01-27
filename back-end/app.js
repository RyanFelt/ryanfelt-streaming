require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { identityService, authenticate } = require('ryanfelt-identity-service');
const { getAllTitles } = require('./controllers/getAllTitles');
const { getAllFilms } = require('./controllers/getAllFilms');
const { subscribed } = require('./controllers/subscribed');

const { LVS_1, LVS_2, LIS_1, PORT } = process.env;

const app = express();

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/videos/lvs_1', express.static(__dirname + LVS_1));
app.use('/videos/lvs_2', express.static(__dirname + LVS_2));
app.use('/images/lis_1', express.static(__dirname + LIS_1));
app.use('/images', express.static(__dirname + '/images'));
app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use('/api/identity-service', identityService);

app.get('/api/getAllTitles', getAllTitles);
app.get('/api/getAllFilms', getAllFilms);
app.get('/api/subscribed', authenticate('ADMIN'), subscribed);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../front-end/build/index.html'));
});

app.listen(PORT, function() {
  console.log('************************************');
  console.log('***HTTP Listening on port %s...***', PORT);
  console.log('************************************');
});
