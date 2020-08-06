require('dotenv').config();

// const uuidv4 = require('uuid/v4');
// const { dynamodb } = require('./src/utils/dynamodb/config');
// const { scanAllTitles, scanAllEpisodes } = require('./src/utils/dynamodb');
const { initMysql } = require('./src/utils/mysql');
const { query } = require('./src/utils/mysql/setup');
const axios = require('axios');

const main = async () => {
  try {
    const mysql = initMysql();

    // await mysql.dropTables();
    // await mysql.createTables();
    const titles = await mysql.getAllTitles();
    console.log('titles: ', titles.length);

    for (let x = 0; x < titles.length; x++) {
      const requestData = {
        method: 'get',
        url: `https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&t=${titles[x].title}`,
        headers: {
          'x-rapidapi-key':
            '7f4b0dcfdemshd2235ce2de620dfp1d0789jsna956277eb329',
        },
      };

      const res = await axios(requestData);

      if (res.data.Error === 'Movie not found!') {
        console.log(titles[x].title);
        continue;
      }

      // await mysql.updateImdbData(titles[x].id, JSON.stringify(res.data));
    }
  } catch (e) {
    console.log('ERRROR', e);
  }
};

//The hunt

main();

// const titles = [
//   {
//     active: true,
//     bannerImage: 'captain-america-civil-war.jpg',
//     bannerImageLocation: 'images/lis_1',
//     title: 'captain-america:-civil-war',
//     type: 'MOVIES',
//     videoFile: 'CaptainAmericaCivilWar.mp4',
//     videoLocation: 'videos/lvs_1',
//     year: '2016',
//   },
// ];

// const episodeTitleData = {};

// const episodes = [
//   {
//     active: true,
//     description: '',
//     episode: '1',
//     episodeTitle: 'Batman Begins',
//     id: 'd4118f3e-a51c-4320-b42b-01b2a5123b46',
//     season: 'N/A',
//     title: 'the-dark-knight-trilogy',
//     videoFile: 'BatmanBegins.mp4',
//     videoLocation: 'videos/lvs_1',
//   },
// ];

// console.log('Titles', titles.length);
// console.log('Episodes', episodes.length);

// const createTitles = async () => {
//   let time = 0;

//   for (let x = 0; x < titles.length; x++) {
//     setTimeout(() => {
//       putItem({ id: uuidv4(), ...titles[x] }, 'titles');
//       console.log(titles[x]);
//     }, time);
//     time += 200;
//   }
// };

// const createEpisodes = async () => {
//   let time = 0;
//   const episodes = episodeTitleData._embedded.episodes;

//   for (let x = 0; x < episodes.length; x++) {
//     let episodeDesc = episodes[x].summary;
//     episodeDesc = episodeDesc.split('<p>').join('');
//     episodeDesc = episodeDesc.split('</p>').join('');

//     const episode = {
//       active: true,
//       description: episodeDesc,
//       season: episodes[x].season.toString(),
//       episode: episodes[x].number.toString(),
//       episodeTitle: episodes[x].name,
//       title: 'the-mandalorian',
//       videoFile: `TheMandalorian-S0${episodes[x].season.toString()}E0${episodes[
//         x
//       ].number.toString()}.mp4`,
//       videoLocation: 'videos/lvs_1',
//     };
//     setTimeout(() => {
//       // putItem({ id: uuidv4(), ...episode }, 'episodes');
//       console.log(episode);
//     }, time);
//     time += 200;
//   }
// };

// createTitles();
