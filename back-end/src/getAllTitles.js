const { scanAllTitles } = require('./utils/database');

exports.getAllTitles = async (req, res) => {
  try {
    const allTitles = await scanAllTitles();

    let activeTitles = [];
    for (let x = 0; x < allTitles.length; x++) {
      if (allTitles[x].active) {
        activeTitles.push(allTitles[x]);
      }
    }
    res.status(200).send(activeTitles);
  } catch (e) {
    console.log('ERROR -- /getAllTitles --', e);
    res.status(500).send({ message: 'Internal server error' });
  }
};
