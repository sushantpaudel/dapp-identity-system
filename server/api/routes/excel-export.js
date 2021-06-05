const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { getAllRoles, getAllUsers } = require('../../helpers/exports/general-export');

router.get('/excel-export/:type', auth.required, async (req, res, next) => {
  let response = { success: true, message: `Successful` };
  const type = req.params.type;
  switch (type) {
    // This is for product parser make other as required
    case 'user':
      response.filePath = (await getAllUsers(null, null, req.payload.id)).filePath;
      break;
    case 'role':
      response.filePath = (await getAllRoles(null, null, req.payload.id)).filePath;
      break;
    default:
      response.success = false;
      response.message = `Invalid export type - ${type}`;
      logger.error(response);
      break;
  }
  if (response.success) {
    response.downloadUrl = req.apiUrl + response.filePath;
  }
  res.send(response);
});

module.exports = router;
