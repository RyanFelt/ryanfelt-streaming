import axios from 'axios';
import { getAuthTokens, newAuthToken } from './auth';

const subscribedRequest = async (requestData, retry = 0) => {
  const { auth, refresh } = getAuthTokens();

  try {
    requestData.headers = { Authorization: auth };

    const res = await axios(requestData);

    // return JSON.parse(JSON.stringify(res.data));
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

export const createWatchHistory = async (titleInfo, watchedTime) => {
  const { auth, refresh } = getAuthTokens();

  if (!auth || !refresh) {
    return;
  }

  await subscribedRequest({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_URL}/api/watchHistory`,
    data: {
      titleId: titleInfo.id,
      watchedTime,
    },
    headers: { Authorization: auth },
  });
};

export const getWatchedTime = async (titleId) => {
  try {
    const res = await subscribedRequest({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/watchHistory?titleId=${titleId}`,
    });

    return res.watched_time ? res.watched_time : '0';
  } catch (e) {
    console.log('ERROR:: getWatchedTime', e);
    return '0';
  }
};
