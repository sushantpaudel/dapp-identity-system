const { upload } = require('../config/filesystem');
const multer = require('multer');
const parentDir = 'resources/';

module.exports.uploadSingleFile = async (subDirName, req, res, options = {}) => {
  const path = parentDir + subDirName;
  return new Promise(resolve => {
    upload(path, { type: 'single', ...options })(req, res, err => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
      }
      const filePath = (req.file && req.file.path) || '';
      const fileUrl = req.apiUrl + filePath;
      resolve({
        ...req.body,
        file: req.file,
        fileUrl,
      });
    });
  });
};
