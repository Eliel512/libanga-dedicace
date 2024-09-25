const express = require('express');
const router = express.Router();

const postOneMiddleware = require('../middlewares/option/postOne');
const isSeller = require('../middlewares/users/isSeller');
const auth = require('../middlewares/users/auth');

const postOne = require('../controllers/option/postOne');
const getOne = require('../controllers/option/getOne');
const getAllForOne = require('../controllers/option/getAllForOne');

router.get('/all', getAllForOne);
router.get('/', getOne);
router.post('/', auth, isSeller, postOneMiddleware, postOne);

module.exports = router;
