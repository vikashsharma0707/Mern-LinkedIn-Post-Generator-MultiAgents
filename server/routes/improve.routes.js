const express = require('express');
const { improvePost } = require('../controllers/improve.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/post', auth, improvePost);

module.exports = router;
