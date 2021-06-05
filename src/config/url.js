// const CryptoJS = require("crypto-js");
// const { URL_HASH_KEY } = require('./values');
import qs from 'querystring';

export const getHash = url => btoa(btoa(url));
export const getURL = hash => {
  try {
    return atob(atob(hash));
  } catch (err) {
    return false;
  }
};

export const getURLFromSearch = (search, key) => {
  const query = qs.parse(search, { ignorePrefix: true });
  const hash = query[key || '?i'];
  const id = getURL(hash);
  return id;
};
