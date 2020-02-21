const fs = require('fs');

exports.getAllEpisodes = (req, res) => {
  try {
    const title = req.query.title;
    const data = fs.readFileSync(
      `${process.cwd()}/data/${title}/films.json`,
      'UTF-8'
    );

    return res.status(200).send(data);
  } catch (e) {
    console.log('ERROR -- /getAllEpisodes --', e);
    if (e.code === 'ENOENT') {
      return res.status(404).send({ message: 'Title not found.' });
    }
    return res.status(500).send({ message: 'Internal server error' });
  }
};
