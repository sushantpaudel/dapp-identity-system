const router = require('express').Router();
const auth = require('../../config/auth');
const RoleController = require('../controller/role-controller');
const { ROLE_AUTH_VALUES } = require('../../util/values');
const { authorizeRole } = require('../util/role');
const validationRule = require('../util/validation-rule');

router.get('/roles', auth.required, authorizeRole(ROLE_AUTH_VALUES.ROLE_GET), RoleController.getAll);

router.get('/roles/:id', auth.required, authorizeRole(ROLE_AUTH_VALUES.ROLE_GET), RoleController.getOne);

router.post(
  '/roles',
  auth.required,
  authorizeRole(ROLE_AUTH_VALUES.ROLE_POST),
  validationRule({
    name: 'required|string',
  }),
  RoleController.post,
);

router.put('/roles', auth.required, authorizeRole(ROLE_AUTH_VALUES.ROLE_PUT), RoleController.put);

router.delete('/roles/:id', auth.required, authorizeRole(ROLE_AUTH_VALUES.ROLE_DELETE), RoleController.delete);

module.exports = router;
