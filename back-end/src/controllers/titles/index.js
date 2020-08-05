const uuidv4 = require('uuid/v4');
const { initMysql } = require('../../utils/mysql');
const { ValidationError } = require('../../utils/errors');

exports.getAllTitles = async (req) => {
  const mysql = initMysql();

  const allTitles = await mysql.getAllTitles(req.user.userId);

  const massagedTitles = allTitles.filter((title) => {
    if (title.seasons) title.seasons = title.seasons.split(',');
    if (title.genres) title.genres = title.genres.split(',');

    return title;
  });

  const watchedLast = await mysql.getWatchedLatest(req.user.userId);

  for (let x = 0; x < watchedLast.length; x++) {
    for (let i = 0; i < massagedTitles.length; i++) {
      if (massagedTitles[i].id === watchedLast[x].title_id) {
        const temp = massagedTitles[i];
        massagedTitles.splice(i, 1);
        massagedTitles.unshift(temp);
        break;
      }
    }
  }

  return massagedTitles;
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
    imdb_data: JSON.stringify(req.body.imdbData),
  };

  await mysql.insertTitle(newTitle);

  if (
    req.body.seasons &&
    Array.isArray(req.body.seasons) &&
    req.body.seasons[0]
  ) {
    const seasons = req.body.seasons;

    for (let x = 0; x < seasons.length; x++) {
      await mysql.insertSeason(id, seasons[x]);
    }
  } else if (req.body.type === 'SERIES' && !req.body.seasons) {
    await mysql.insertSeason(id, 'N/A');
  }

  if (req.body.genres && Array.isArray(req.body.genres)) {
    const genres = req.body.genres;

    for (let x = 0; x < genres.length; x++) {
      await mysql.insertGenre(id, genres[x]);
    }
  }

  return;
};
