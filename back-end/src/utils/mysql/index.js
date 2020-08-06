const { createTables, dropTables } = require('./setup');
const {
  getAllTitles,
  getAllEpisodes,
  getTitleByVideoFile,
  insertTitle,
  insertEpisode,
  updateImdbData,
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
const { insertGenre, deleteGenre } = require('./genres');

exports.initMysql = () => {
  return {
    createTables,
    dropTables,

    getAllTitles,
    getAllEpisodes,
    getTitleByVideoFile,
    insertTitle,
    insertEpisode,
    updateImdbData,

    getWatchHistory,
    insertWatchHistory,
    updateWatchHistory,
    getWatchedLatest,

    insertSeason,

    getWatchList,
    insertWatchList,
    deleteWatchList,

    insertGenre,
    deleteGenre,
  };
};
