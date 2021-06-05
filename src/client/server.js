const axios = require('axios');
const { USER_TOKEN } = require('../config/values');

const headers = {
  // 'Content-Type': 'application/json',
  Authorization: 'Customer ' + localStorage.getItem(USER_TOKEN),
};
const STORE_URL = process.env.REACT_APP_CLIENT_URL;
const server = axios.create({
  baseURL: STORE_URL,
  headers: headers,
});

export { server, STORE_URL };
