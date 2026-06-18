const express = require('express');
const { generateHook } = require('../controllers/hook.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/generate', auth, generateHook);

module.exports = router;
