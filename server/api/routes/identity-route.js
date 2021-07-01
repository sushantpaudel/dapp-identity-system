const router = require('express').Router();
const auth = require('../../config/auth');
const IdentityController = require('../controller/identity-controller');

router.get('/digital-identity', auth.required, IdentityController.getAll);

router.get('/digital-identity/:id', auth.required, IdentityController.getOne);

router.post('/digital-identity', auth.required, IdentityController.post);

router.put('/digital-identity', auth.required, IdentityController.put);

router.delete('/digital-identity/:id', auth.required, IdentityController.delete);

module.exports = router;
