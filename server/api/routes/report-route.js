const router = require('express').Router();
const validationRule = require('../util/validation-rule');
const { authorizeRole } = require('../util/role');
const { ROLE_AUTH_VALUES } = require('../../util/values');
const auth = require('../../config/auth');
const ReportController = require('../controller/report-controller');

router.get('/create-report', auth.required, authorizeRole(ROLE_AUTH_VALUES.SUPER_ADMIN), ReportController.getAll);

router.get('/create-report/:id', auth.required, authorizeRole(ROLE_AUTH_VALUES.SUPER_ADMIN), ReportController.getOne);

router.post(
  '/create-report',
  auth.required,
  authorizeRole(ROLE_AUTH_VALUES.SUPER_ADMIN),
  validationRule({
    name: 'required|string',
    query: 'required|string',
    reportType: 'required|string',
    sequence: 'required|string',
    colSize: 'required|string',
  }),
  ReportController.post,
);

router.put('/create-report', auth.required, authorizeRole(ROLE_AUTH_VALUES.SUPER_ADMIN), ReportController.put);

router.delete(
  '/create-report/:id',
  auth.required,
  authorizeRole(ROLE_AUTH_VALUES.SUPER_ADMIN),
  ReportController.delete,
);

module.exports = router;
