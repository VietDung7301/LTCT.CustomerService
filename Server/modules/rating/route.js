const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/product/rating',controller.createProductRating);
router.get('/product/rating', controller.getAllRating);
router.get('/', controller.test);

module.exports = router;