const express = require('express');
const { getHistory, clearHistory } = require('../controllers/history.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getHistory);
router.delete('/clear', auth, clearHistory);

module.exports = router;
