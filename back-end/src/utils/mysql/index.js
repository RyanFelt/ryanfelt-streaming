const { createTables, dropTables } = require('./setup');
const {
  getAllTitles,
  getAllEpisodes,
  insertTitle,
  insertEpisode,
} = require('./titles');

exports.initMysql = () => {
  return {
    createTables,
    dropTables,

    getAllTitles,
    getAllEpisodes,
    insertTitle,
    insertEpisode,
  };
};
