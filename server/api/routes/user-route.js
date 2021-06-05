const router = require('express').Router();
const auth = require('../../config/auth');
const UserController = require('../controller/user-controller');
const { authorizeRole } = require('../util/role');
const { ROLE_AUTH_VALUES } = require('../../util/values');
const validationRule = require('../util/validation-rule');

router.get('/users', auth.required, authorizeRole(ROLE_AUTH_VALUES.USER_GET), UserController.getAll);

router.get('/users/verify', UserController.verify);

router.get('/users/reset-password', UserController.resetPassword);

router.get('/users/:id', auth.required, authorizeRole(ROLE_AUTH_VALUES.USER_GET), UserController.getOne);

router.post(
  '/users',
  auth.required,
  authorizeRole(ROLE_AUTH_VALUES.USER_POST),
  validationRule({
    email: 'required|email',
    username: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    password: 'required|string|min:8',
  }),
  UserController.post,
);

router.post('/users/change-password', auth.required, UserController.changePassword);

router.post('/users/forgot-password', UserController.forgotPassword);

router.post('/users/reset-password', UserController.resetPasswordPost);

router.put(
  '/users',
  auth.required,
  authorizeRole(ROLE_AUTH_VALUES.USER_PUT),
  validationRule({
    email: 'required|email',
    username: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    password: 'string|min:8',
  }),
  UserController.put,
);

router.delete('/users/:id', auth.required, authorizeRole(ROLE_AUTH_VALUES.USER_DELETE), UserController.delete);

module.exports = router;
