const express = require('express');
const { generateCarousel } = require('../controllers/carousel.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/generate', auth, generateCarousel);

module.exports = router;
