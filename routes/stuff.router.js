const express = require('express');
const router = express.Router();

const sellerRouter = require('./seller.router');
const dedicationRouter = require('./dedication.router');
const optionRouter = require('./option.router');
const commentRouter = require('./comment.router');

const auth = require('../middlewares/users/auth');

router.use('/sellers', sellerRouter);
router.use('/dedications', auth, dedicationRouter);
router.use('/options', optionRouter);
router.use('/comments', commentRouter);

module.exports = router;