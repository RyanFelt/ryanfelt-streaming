const { queryAllEpisodes } = require('./utils/database');

exports.getAllEpisodes = async (req, res) => {
  try {
    const title = req.query.title;

    const episodes = await queryAllEpisodes(title);

    if (!episodes.length) {
      return res.status(404).send({ message: 'Title not found.' });
    }

    const filteredEpisodes = episodes.filter(episode => episode.active);

    const orderedEpisodes = filteredEpisodes.sort((a, b) =>
      a.episode > b.episode ? 1 : -1
    );

    return res.status(200).send(orderedEpisodes);
  } catch (e) {
    console.log('ERROR -- /getAllEpisodes --', e);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
