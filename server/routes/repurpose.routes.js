const express = require('express');
const { repurposeContent } = require('../controllers/repurpose.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/content', auth, repurposeContent);

module.exports = router;
