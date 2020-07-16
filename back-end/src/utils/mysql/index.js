const { createTables, dropTables } = require('./setup');
const {
  getAllTitles,
  getAllEpisodes,
  getTitleByVideoFile,
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
const {
  getWatchList,
  insertWatchList,
  deleteWatchList,
} = require('./watchList');

exports.initMysql = () => {
  return {
    createTables,
    dropTables,

    getAllTitles,
    getAllEpisodes,
    getTitleByVideoFile,
    insertTitle,
    insertEpisode,

    getWatchHistory,
    insertWatchHistory,
    updateWatchHistory,
    getWatchedLatest,

    insertSeason,

    getWatchList,
    insertWatchList,
    deleteWatchList,
  };
};
