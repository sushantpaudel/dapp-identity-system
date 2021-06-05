const router = require('express').Router();
const { ESEWA } = require('../../config/credentials');

router.get('/all', (req, res, next) => {
  const apiUrl = req.apiUrl;
  res.send({
    esewaMerchantCode: ESEWA.MERCHANT_CODE,
  });
});

module.exports = router;
