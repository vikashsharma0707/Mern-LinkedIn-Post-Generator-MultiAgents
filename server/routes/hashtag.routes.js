const express = require('express');
const { generateHashtags } = require('../controllers/hashtag.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/generate', auth, generateHashtags);

module.exports = router;
