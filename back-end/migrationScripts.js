const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true,
  region: 'us-east-1'
});
const uuidv4 = require('uuid/v4');

const data = [
  {
    active: true,
    bannerImage: 'na.png',
    bannerImageLocation: 'images/lis_1',
    title: 'star-wars:-the-rise-of-skywalker',
    type: 'MOVIES',
    videoFile: 'StarWarsTheRiseOfSkywalker.mp4',
    videoLocation: 'videos/lvs_2',
    year: '2019'
  }
];

const putTitle = async Item => {
  try {
    const params = {
      TableName: 'titles',
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
