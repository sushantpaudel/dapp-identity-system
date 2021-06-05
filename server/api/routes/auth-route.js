const router = require('express').Router();
const auth = require('../../config/auth');
const AuthController = require('../controller/auth-controller');
const validationRule = require('../util/validation-rule');

router.get('/authorize', auth.required, AuthController.authorize);

router.post(
  '/login',
  validationRule({
    username: 'required|string',
    password: 'required|string',
  }),
  AuthController.login,
);

router.put('/logout', auth.optional, auth.required, AuthController.logout);

module.exports = router;
