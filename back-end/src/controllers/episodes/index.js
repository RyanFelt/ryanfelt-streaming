const { queryAllEpisodes } = require('../../utils/database');
const { ResourceNotFoundError } = require('../../utils/errors');

exports.getAllEpisodes = async (req, res) => {
  const title = req.query.title;

  const episodes = await queryAllEpisodes(title);

  if (!episodes.length) {
    throw new ResourceNotFoundError('Title not found.');
  }

  const filteredEpisodes = episodes.filter((episode) => episode.active);

  const orderedEpisodes = filteredEpisodes.sort((a, b) =>
    parseInt(a.episode) > parseInt(b.episode) ? 1 : -1
  );

  return orderedEpisodes;
};
