const express = require('express');
const { getAnalytics } = require('../controllers/analytics.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAnalytics);

module.exports = router;
