const uuidv4 = require('uuid/v4');
const { initMysql } = require('../../utils/mysql');
const { ValidationError } = require('../../utils/errors');

exports.getAllTitles = async (req) => {
  const mysql = initMysql();

  const allTitles = await mysql.getAllTitles(req.user.userId);

  const activeTitles = allTitles.filter((title) => {
    if (title.seasons) {
      title.seasons = title.seasons.split(',');
    }

    if (title.active) return title;
  });

  const watchedLast = await mysql.getWatchedLatest(req.user.userId);

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

exports.postTitle = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId) throw new ValidationError('MISSING AUTH TOKEN');
  else if (!req.body.title) throw new ValidationError('MISSING title');
  else if (!req.body.type) throw new ValidationError('MISSING type');
  else if (!req.body.bannerImage)
    throw new ValidationError('MISSING bannerImage');

  const id = uuidv4();

  const newTitle = {
    id,
    title: req.body.title,
    type: req.body.type,
    banner_image: req.body.bannerImage,
    active: true,
    video_file: req.body.videoFile || null,
    year: req.body.year || null,
  };

  await mysql.insertTitle(newTitle);

  if (req.body.seasons && Array.isArray(req.body.seasons)) {
    const seasons = req.body.seasons;

    for (let x = 0; x < seasons.length; x++) {
      await mysql.insertSeason(id, seasons[x]);
    }
  }

  return;
};
