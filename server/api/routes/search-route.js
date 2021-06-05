const router = require('express').Router();
const auth = require('../../config/auth');
const SearchController = require('../controller/search-controller');

router.get('/search/suppliers', auth.required, SearchController.searchSuppliers);

router.get('/search/products', auth.required, SearchController.searchProducts);

module.exports = router;
