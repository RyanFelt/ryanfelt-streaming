require('dotenv').config();

const uuidv4 = require('uuid/v4');
const { dynamodb } = require('./src/utils/dynamoSetup');
const { scanAllTitles, scanAllEpisodes } = require('./src/utils/database');
const { initMysql } = require('./src/utils/mysql');
const { query } = require('./src/utils/mysql/setup');

const main = async () => {
  const mysql = initMysql();

  await mysql.dropTables();
  await mysql.createTables();

  const allTitles = await scanAllTitles();

  console.log('TITLES', allTitles.length);

  for (let x = 0; x < allTitles.length; x++) {
    console.log(allTitles[x]);

    const newTitle = {
      id: allTitles[x].id,
      title: allTitles[x].title,
      type: allTitles[x].type,
      banner_image: allTitles[x].bannerImage,
      active: allTitles[x].active,
      video_file: allTitles[x].videoFile,
      year: allTitles[x].year,
    };

    await mysql.insertTitle(newTitle);
  }

  const allEpisodes = await scanAllEpisodes();

  console.log('EPISODES', allEpisodes.length);

  for (let x = 0; x < allEpisodes.length; x++) {
    const parentTitle = await query(
      `SELECT * FROM titles WHERE title = "${allEpisodes[x].title}"`
    );

    const newTitle = {
      id: allEpisodes[x].id,
      title: allEpisodes[x].episodeTitle,
      active: allEpisodes[x].active,
      video_file: allEpisodes[x].videoFile,
      parent_id: parentTitle[0].id,
      season: allEpisodes[x].season,
      episode: allEpisodes[x].episode,
      description: allEpisodes[x].description.replace(/"/g, '\\"'),
    };

    console.log(newTitle);
    await mysql.insertEpisode(newTitle);
  }
};

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
