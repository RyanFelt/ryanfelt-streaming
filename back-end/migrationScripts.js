const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true,
  region: 'us-east-1'
});
const uuidv4 = require('uuid/v4');

// const data = require('../data/arrested-development/films.json');
// const data = require('../data/brooklyn-nine-nine/films.json');
// const data = require('../data/parks-and-recreation/films.json');
// const data = require('../data/seinfeld/films.json');
// const data = require('../data/all-titles.json');
const data = require('../../data/the-office/films.json');

const { TITLES_TABLE } = process.env;

const putTitle = async Item => {
  try {
    const params = {
      TableName: 'episodes',
      Item
    };
    return docClient.put(params).promise();
  } catch (e) {
    console.log(`ERROR :: putTitle: Item=${Item} :: ${e}`);
  }
};

console.log(data.length);
const main = async () => {
  let time = 0;
  for (let x = 0; x < data.length; x++) {
    setTimeout(() => {
      putTitle({ id: uuidv4(), ...data[x] });
      console.log(data[x]);
    }, time);
    time += 200;
  }
};

main();
