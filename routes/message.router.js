const express = require('express');
const router = express.Router();

const auth = require('../middlewares/users/auth');
const postOneMiddleware = require('../middlewares/message/postOne');
const getAllMiddleware = require('../middlewares/message/getAll');

const postOne = require('../controllers/message/postOne');
const getOneForAll = require('../controllers/message/getAll');

router.get('/', auth, getAllMiddleware, getOneForAll);
router.post('/', postOneMiddleware, postOne);

module.exports = router;