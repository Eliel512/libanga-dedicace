const express = require('express');
const router = express.Router();

const auth = require('../middlewares/users/auth');
const postOneMiddleware = require('../middlewares/comment/postOne');
const updateOneMiddleware = require('../middlewares/comment/updateOne');
const deleteOneMiddleware = require('../middlewares/comment/deleteOne');

const postOne = require('../controllers/comment/postOne');
const getOneForAll = require('../controllers/comment/getOneForAll');
const deleteOne = require('../controllers/comment/getOneForAll');
const updateOne = require('../controllers/comment/updateOne');

router.get('/comments', getOneForAll);
router.post('/comments', auth, postOneMiddleware, postOne);
router.put('/comments', auth, updateOneMiddleware, updateOne);
router.delete('/comments', auth, deleteOneMiddleware, deleteOne);

module.exports = router;