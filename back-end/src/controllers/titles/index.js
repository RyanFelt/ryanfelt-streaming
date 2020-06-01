const uuidv4 = require('uuid/v4');
const { initMysql } = require('../../utils/mysql');

exports.getAllTitles = async (req) => {
  const mysql = initMysql();

  const allTitles = await mysql.getAllTitles();

  const activeTitles = allTitles.filter((title) => {
    if (title.seasons) {
      title.seasons = title.seasons.split(',');
    }

    if (title.active) return title;
  });

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

exports.postTitle = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
  else if (!req.body.title)
    throw new ValidationError({ message: 'MISSING title' });
  else if (!req.body.type)
    throw new ValidationError({ message: 'MISSING type' });
  else if (!req.body.bannerImage)
    throw new ValidationError({ message: 'MISSING bannerImage' });
  else if (!req.body.videoFile)
    throw new ValidationError({ message: 'MISSING videoFile' });
  else if (!req.body.year)
    throw new ValidationError({ message: 'MISSING year' });

  const newTitle = {
    id: uuidv4(),
    title: req.body.title,
    type: req.body.type,
    banner_image: req.body.bannerImage,
    active: true,
    video_file: req.body.videoFile,
    year: req.body.year,
  };

  await mysql.insertTitle(newTitle);

  return;
};
