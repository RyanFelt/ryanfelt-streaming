const axios = require('axios');
const { ValidationError } = require('../../utils/errors');

const { RAPID_API_KEY } = process.env;

exports.getImdbData = async (req) => {
  try {
    if (!req.user.userId)
      throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
    else if (!req.query.title)
      throw new ValidationError({ message: 'MISSING TITLE' });

    const { title, season, episode } = req.query;

    const requestData = {
      method: 'get',
      url: `https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&t=${title}`,
      headers: { 'x-rapidapi-key': RAPID_API_KEY },
    };

    if (season) requestData.url += `&season=${season}`;
    if (episode) requestData.url += `&episode=${episode}`;

    const res = await axios(requestData);

    return res.data;
  } catch (err) {
    throw new ValidationError({
      message: `ERROR connecting to imdb -- ${err}`,
    });
  }
};
