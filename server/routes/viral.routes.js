const express = require('express');
const { analyzeViral } = require('../controllers/viral.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/analyze', auth, analyzeViral);

module.exports = router;
