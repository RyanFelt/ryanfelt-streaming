const { createTables, dropTables } = require('./setup');
const {
  getAllTitles,
  getAllEpisodes,
  insertTitle,
  insertEpisode,
} = require('./titles');
const {
  getWatchHistory,
  insertWatchHistory,
  updateWatchHistory,
  getWatchedLatest,
} = require('./watchHistory');
const { insertSeason } = require('./seasons');

exports.initMysql = () => {
  return {
    createTables,
    dropTables,

    getAllTitles,
    getAllEpisodes,
    insertTitle,
    insertEpisode,

    getWatchHistory,
    insertWatchHistory,
    updateWatchHistory,
    getWatchedLatest,

    insertSeason,
  };
};
