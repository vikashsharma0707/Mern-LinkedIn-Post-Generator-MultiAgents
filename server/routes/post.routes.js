const express = require('express');
const { generatePost, getPosts, savePost, deletePost } = require('../controllers/post.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/generate', auth, generatePost);
router.get('/', auth, getPosts);
router.put('/:id/save', auth, savePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
