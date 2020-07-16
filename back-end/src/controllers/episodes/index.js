const uuidv4 = require('uuid/v4');
const { initMysql } = require('../../utils/mysql');
const {
  ResourceNotFoundError,
  ValidationError,
  ResourceExistsError,
} = require('../../utils/errors');

exports.getAllEpisodes = async (req, res) => {
  const title = req.query.title;

  const mysql = initMysql();

  const episodes = await mysql.getAllEpisodes(title, req.user.userId);

  if (!episodes.length) {
    throw new ResourceNotFoundError('No episodes found.');
  }

  const filteredEpisodes = episodes.filter((episode) => episode.active);

  const orderedEpisodes = filteredEpisodes.sort((a, b) =>
    parseInt(a.episode) > parseInt(b.episode) ? 1 : -1
  );

  return orderedEpisodes;
};

exports.postEpisode = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId) throw new ValidationError('MISSING AUTH TOKEN');
  else if (!req.body.title) throw new ValidationError('MISSING title');
  else if (!req.body.videoFile) throw new ValidationError('MISSING videoFile');
  else if (!req.body.season) throw new ValidationError('MISSING season');
  else if (!req.body.episode) throw new ValidationError('MISSING episode');
  else if (!req.body.description)
    throw new ValidationError('MISSING description');
  else if (!req.body.parentId) throw new ValidationError('MISSING parentId');

  const exists = await mysql.getEpisodeByVideoFile(req.body.videoFile);

  if (exists.length) {
    throw new ResourceExistsError('episode already exists');
  }

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
