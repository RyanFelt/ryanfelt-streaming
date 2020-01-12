const data = require('../data/all-titles.json');

exports.getAllTitles = (req, res) => {
  try {
    let activeTitles = [];
    for (let x = 0; x < data.length; x++) {
      if (data[x].active) {
        activeTitles.push(data[x]);
      }
    }
    res.status(200).send(activeTitles);
  } catch (e) {
    console.log('ERROR -- /getAllTitles --', e);
    res.status(500).send({ message: 'Internal server error' });
  }
};
