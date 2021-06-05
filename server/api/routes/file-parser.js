const router = require('express').Router();
const multer = require('multer');
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { FileParserMeta } = require('../../models');
const { upload } = require('../../config/filesystem');
const { respond } = require('../../util/response');
const sequelize = require('sequelize');
const httpStatus = require('http-status');

router.post('/file-parser/:type', auth.required, async (req, res) => {
  const file = await new Promise(resolve => {
    upload('temp', { type: 'single' })(req, res, err => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        logger.error(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        logger.error(err);
      }
      resolve(req.file);
    });
  });
  switch (req.params.type) {
    // This is for product parser make other as required
    default:
      logger.error({ message: 'Invalid parser type', type: req.params.type });
      respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Invalid parser type');
  }
});

router.get('/file-parser/meta', auth.required, async (req, res) => {
  FileParserMeta.findAll({
    where: {
      isDeleted: false,
    },
    attributes: ['id', 'name', 'key', [sequelize.fn('concat', req.apiUrl, sequelize.col('filePath')), 'downloadUrl']],
  })
    .then(fileMeta => {
      respond(res, httpStatus.OK, 'Successful!', fileMeta);
    })
    .catch(err => {
      logger.error(err);
      respond(res, httpStatus.INTERNAL_SERVER_ERROR, 'Unsuccessful!');
    });
});

module.exports = router;
