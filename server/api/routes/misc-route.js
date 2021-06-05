const router = require('express').Router();
const auth = require('../../config/auth');
const MiscController = require('../controller/misc-controller');

router.get('/all/roles', auth.required, MiscController.getAllRolesMeta);
router.get('/all/users', auth.required, MiscController.getAllUsersMeta);
router.get('/all/orders', auth.required, MiscController.getAllOrderMeta);

router.get('/all/products', auth.required, MiscController.getAllProductsMeta);

module.exports = router;
