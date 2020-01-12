require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const setUp = require('ryanfelt-identity-service');
const { getAllTitles } = require('./controllers/getAllTitles');
const { getAllFilms } = require('./controllers/getAllFilms');
const { subscribed } = require('./controllers/subscribed');

const { LVS_1, PORT } = process.env;

const { identityService, authenticate } = setUp({
  DYNAMODB_PORT: 8000,
  USER_TABLE: 'users',
  REFRESH_TABLE: 'refresh',
  REGION: 'us-east-1',
  ACCESSS_TOKEN_TIME: 60 * 60 * 2,
  REFRESH_TOKEN_TIME: 60 * 60 * 24 * 365,
  ACCESS_KEY: 'server_secret',
  REFRESH_KEY: 'refresh_secret',
  CIPHER_ALGORITHM: 'aes-256-ctr',
  ENCRYPT_PASSWORD_KEY: 'b2df428b9929d3ace7c598bbf4e496b2',
  ENCRYPT_KEY: 'ciphersjdkfituejdnvmgjfhnskcjsme',
  INPUT_ENCODING: 'utf8',
  OUTPUT_ENCODING: 'hex'
});

const app = express();

app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/videos/lvs_1', express.static(__dirname + LVS_1));
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
