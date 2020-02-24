const { queryAllEpisodes } = require('./utils/database');

exports.getAllEpisodes = async (req, res) => {
  try {
    const title = req.query.title;

    const episodes = await queryAllEpisodes(title);

    if (!episodes) {
      return res.status(404).send({ message: 'Title not found.' });
    }

    const result = episodes.filter(episode => episode.active);

    return res.status(200).send(result);
  } catch (e) {
    console.log('ERROR -- /getAllEpisodes --', e);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
