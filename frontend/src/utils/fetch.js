import axios from 'axios';
import { getToken,AUTH_KEY, setToken, setRefreshToken, clearStorages }  from '../utils/storage';
import { BASE_URL as URL } from '../utils/fetch';
import auth from '../services/auth';

export const BASIC_AUTH = () => ({
  'Authorization': AUTH_KEY,
  'Accept-Language': 'id',
});

export const Authorization = `Bearer ${getToken()}`;

export const BASE_URL = ( mode=> {

  if (mode === 'production') {
    return 'https://partner-api.agreeculture.id';
  }

  if (mode === 'staging') {
    return 'https://stage-api.agreeculture.id';
  }

  return 'https://dev-api.agreeculture.id';
})(process.env.MODE);


axios.interceptors.request.use(
  config => config,
  (error) => {
    return Promise.reject(error);
  }
);
const unathorizedCode = [401,403];

const blackListUrls = [
  `${URL}/api/v1/users/partner-admin/login`,
  `${URL}/api/v1/users/forgot-password`,
  `${URL}/api/v1/users/verify`,
  `${URL}/api/v1/users/reset-password`
];

let refreshingToken = null;

axios.interceptors.response.use(
  res => res,
  async (err) => {
    const originalConfig = err.config;
    if (!blackListUrls.includes(originalConfig.url) && err.response) {
      // Access Token was expired
      if (unathorizedCode.includes(err.response.status) && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          //prevent refreshtoken called multiple times
          refreshingToken = refreshingToken || auth.refreshToken();
          const res = await refreshingToken;
          refreshingToken = null;
          const { accessToken, refreshToken } = res.data;
          if(accessToken){
            setToken(accessToken);
            originalConfig.headers.Authorization = `Bearer ${accessToken}`;
            setRefreshToken(refreshToken);
          }
          return axios(originalConfig);
        } catch (_error) {
          //clearStorage and redirect to login page when get new token failed
          clearStorages();
          location.href = '/login';
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);


export default function fetch(url, method, param1, param2) {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then(res => resolve(res.data))
      .catch(err => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.'
        };

        if (!err.response) {
          reject(defaultError);
        } else if (!err.response.data) {
          reject(defaultError);
        } else {
          reject(err.response.data);
        }
      });
  });
}
