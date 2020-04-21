const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true,
  region: 'us-east-1',
});
const uuidv4 = require('uuid/v4');

const sherlockData = {};

const titles = [
  {
    active: true,
    bannerImage: 'dolittle.jpg',
    bannerImageLocation: 'images/lis_1',
    title: 'dolittle',
    type: 'MOVIES',
    videoFile: 'Dolittle.mp4',
    videoLocation: 'videos/lvs_2',
    year: '2020',
  },
];

const episodes = [
  {
    active: true,
    description: '',
    episode: '1',
    episodeTitle: 'Batman Begins',
    id: 'd4118f3e-a51c-4320-b42b-01b2a5123b46',
    season: 'N/A',
    title: 'the-dark-knight-trilogy',
    videoFile: 'BatmanBegins.mp4',
    videoLocation: 'videos/lvs_1',
  },
];

const putItem = async (Item, table) => {
  try {
    const params = {
      TableName: table,
      Item,
    };
    return docClient.put(params).promise();
  } catch (e) {
    console.log(`ERROR :: putItem: Table = ${table} Item=${Item} :: ${e}`);
  }
};

console.log('Titles', titles.length);
console.log('Episodes', episodes.length);

const main = async () => {
  let time = 0;
  const episodes = sherlockData._embedded.episodes;

  for (let x = 0; x < episodes.length; x++) {
    let episodeDesc = episodes[x].summary;
    episodeDesc = episodeDesc.split('<p>').join('');
    episodeDesc = episodeDesc.split('</p>').join('');

    const episode = {
      active: true,
      description: episodeDesc,
      season: episodes[x].season.toString(),
      episode: episodes[x].number.toString(),
      episodeTitle: episodes[x].name,
      title: 'the-mandalorian',
      videoFile: `TheMandalorian-S0${episodes[x].season.toString()}E0${episodes[
        x
      ].number.toString()}.mp4`,
      videoLocation: 'videos/lvs_1',
    };
    setTimeout(() => {
      // putItem({ id: uuidv4(), ...episode }, 'episodes');
      // putItem({ id: uuidv4(), ...titles[x] }, 'titles');
      console.log(episode);
    }, time);
    time += 200;
  }
};

main();
