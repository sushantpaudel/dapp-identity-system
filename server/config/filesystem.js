const fs = require('fs');
const shell = require('shelljs');
const multer = require('multer');
const moment = require('moment');
const axios = require('axios').default;
const logger = require('./logger');
const createDir = path => {
  if (!fs.existsSync(path)) shell.mkdir('-p', path);
};
const storage = path => {
  createDir(path);
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const uniquePrefix = moment().format('YYYY-MM-DD') + '-' + Math.round(Math.random() * 1e9) + '-';
      cb(null, uniquePrefix + file.originalname);
    },
  });
};

module.exports.upload = (path, options) => {
  switch (options.type) {
    case 'single':
      return multer({ storage: storage(path) }).single(options.name || 'file');
    case 'array':
      return multer({ storage: storage(path) }).array(options.name || 'file');
    default:
      multer({ storage: storage(path) }).array(options.name || 'file');
  }
};
module.exports.createDirectories = () => {
  createDir('temp');
  createDir('resources');
};
module.exports.createDir = createDir;
module.exports.createDirWithFileName = path => createDir(path.split('/').slice(0, -1).join('/'));
module.exports.downloadFile = async (url, token, path) => {
  try {
    if (fs.existsSync(path)) {
      return { filePath: path };
    } else {
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Do something with the response
      createDir(path.split('/').slice(0, -1).join('/'));
      const file = await response.data.pipe(fs.createWriteStream(path));
      return { filePath: file.path };
    }
  } catch (err) {
    // Handling errors
    logger.error(err);
    return null;
  }
};
