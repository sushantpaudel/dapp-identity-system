const Validator = require('validatorjs');
const logger = require('../../config/logger');
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = (validationRule, customMessages) => (req, res, next) => {
  validator(req.body, validationRule, customMessages, (err, status) => {
    if (!status) {
      logger.error({
        body: req.body,
        error: err,
      });
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};
