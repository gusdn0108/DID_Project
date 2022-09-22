const axios = require('axios');
const { backend, frontend } = require('./ip.js');

const config = {
  baseURL: backend,
  headers: {
    withCredentials: true,
    'Content-Type': 'application/json',
  },
};

export const request = axios.create({
  ...config,
});
