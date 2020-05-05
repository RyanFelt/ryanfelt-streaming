const { initMysql } = require('../../utils/mysql');
const { ResourceNotFoundError } = require('../../utils/errors');

exports.getAllEpisodes = async (req, res) => {
  const title = req.query.title;

  const mysql = initMysql();

  const episodes = await mysql.getAllEpisodes(title);

  if (!episodes.length) {
    throw new ResourceNotFoundError('Title not found.');
  }

  const filteredEpisodes = episodes.filter((episode) => episode.active);

  const orderedEpisodes = filteredEpisodes.sort((a, b) =>
    a.episode > b.episode ? 1 : -1
  );

  return orderedEpisodes;
};
