const { initMysql } = require('../../utils/mysql');
const { ResourceNotFoundError } = require('../../utils/errors');

exports.getAllEpisodes = async (req, res) => {
  const title = req.query.title;

  const mysql = initMysql();

  const episodes = await mysql.getAllEpisodes(title);

  if (!episodes.length) {
    throw new ResourceNotFoundError('Title not found.');
  }

  const filteredEpisodes = episodes.filter((episode) => episode.active);

  const orderedEpisodes = filteredEpisodes.sort((a, b) =>
    parseInt(a.episode) > parseInt(b.episode) ? 1 : -1
  );

  return orderedEpisodes;
};

exports.postEpisode = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
  else if (!req.body.title)
    throw new ValidationError({ message: 'MISSING title' });
  else if (!req.body.videoFile)
    throw new ValidationError({ message: 'MISSING videoFile' });
  else if (!req.body.season)
    throw new ValidationError({ message: 'MISSING season' });
  else if (!req.body.episode)
    throw new ValidationError({ message: 'MISSING episode' });
  else if (!req.body.description)
    throw new ValidationError({ message: 'MISSING description' });
  else if (!req.body.parentId)
    throw new ValidationError({ message: 'MISSING parentId' });

  const newEpisode = {
    id: uuidv4(),
    title: req.body.title,
    active: true,
    video_file: req.body.videoFile,
    season: req.body.season,
    episode: req.body.episode,
    description: req.body.description,
    parent_id: req.body.parentId,
  };

  await mysql.insertEpisode(newEpisode);

  return;
};
