const { initMysql } = require('../../utils/mysql');

exports.getAllTitles = async (req) => {
  const mysql = initMysql();

  const allTitles = await mysql.getAllTitles();

  const activeTitles = allTitles.filter((title) => title.active);

  let watchedLast = [];

  if (req.user && req.user.userId) {
    watchedLast = await mysql.getWatchedLatest(req.user.userId);
  }

  for (let x = 0; x < watchedLast.length; x++) {
    for (let i = 0; i < activeTitles.length; i++) {
      if (activeTitles[i].id === watchedLast[x].title_id) {
        const temp = activeTitles[i];
        activeTitles.splice(i, 1);
        activeTitles.unshift(temp);
        break;
      }
    }
  }

  return activeTitles;
};
