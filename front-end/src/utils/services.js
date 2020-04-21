import axios from 'axios';
import { getAuthTokens, newAuthToken } from './auth';

const subscribedRequest = async (requestData) => {
  const { auth, refresh } = getAuthTokens();

  try {
    requestData.headers = { Authorization: auth };

    const res = await axios(requestData);

    return JSON.parse(JSON.stringify(res.data));
  } catch (err) {
    if (err.response && err.response.status === 401) {
      try {
        await newAuthToken(refresh);
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
    return await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/episodes?title=${series}`
    );
  } catch (e) {
    console.log('ERROR:: getAllEpisodes', e);
    throw e;
  }
};
