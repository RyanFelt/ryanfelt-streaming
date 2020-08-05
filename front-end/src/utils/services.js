import axios from 'axios';
import { getAuthTokens, newAuthToken } from './auth';

const { REACT_APP_RAPID_API_KEY } = process.env;

const subscribedRequest = async (requestData, retry = 0) => {
  const { auth, refresh } = getAuthTokens();

  try {
    requestData.headers = { Authorization: auth };

    const res = await axios(requestData);

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      try {
        await newAuthToken(refresh);
        if (retry < 2) return await subscribedRequest(requestData, ++retry);
      } catch (err) {
        console.log('ERROR:: subscribedRequest', err);
      }
    }
    throw err;
  }
};

export const getAllTitles = async () => {
  try {
    const res = await subscribedRequest({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/titles`,
    });

    return res ? res : [];
  } catch (e) {
    console.log('ERROR:: getAllTitles', e);
    return [];
  }
};

export const createNewTitle = async (data) => {
  return await subscribedRequest({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_URL}/api/titles`,
    data,
  });
};

export const getAllEpisodes = async (series) => {
  try {
    const res = await subscribedRequest({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/episodes?title=${series}`,
    });

    return res ? res : [];
  } catch (e) {
    console.log('ERROR:: getAllEpisodes', e);
    throw e;
  }
};

export const createNewEpisode = async (data) => {
  return await subscribedRequest({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_URL}/api/episodes`,
    data,
  });
};

export const getWatchHistoryRecord = async (titleId) => {
  try {
    const historyRecord = await subscribedRequest({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/watchHistory?titleId=${titleId}`,
    });

    return historyRecord;
  } catch (e) {
    console.log('ERROR:: getWatchedTime', e);
    return { watched_time: '0' };
  }
};

export const createWatchHistory = async (
  titleInfo,
  watchedTime,
  watchedPercentage
) => {
  await subscribedRequest({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_URL}/api/watchHistory`,
    data: {
      titleId: titleInfo.id,
      watchedTime,
      watchedPercentage,
    },
  });
};

export const getWatchList = async () => {
  try {
    const watchList = await subscribedRequest({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/watchList`,
    });

    return watchList;
  } catch (e) {
    console.log('ERROR:: getWatchList', e);
    throw e;
  }
};

export const createWatchList = async (titleId) => {
  await subscribedRequest({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_URL}/api/watchList`,
    data: {
      titleId,
    },
  });
};

export const deleteWatchList = async (titleId) => {
  await subscribedRequest({
    method: 'delete',
    url: `${process.env.REACT_APP_BACKEND_URL}/api/watchList`,
    data: {
      titleId,
    },
  });
};

export const getImdb = async (title, season, episode) => {
  try {
    const requestData = {
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/imdb_data?title=${title}`,
    };

    if (season) requestData.url += `&season=${season}`;
    if (episode) requestData.url += `&episode=${episode}`;

    return await subscribedRequest(requestData);
  } catch (err) {
    console.log('ERROR:: getImdb', err);
    throw err;
  }
};
