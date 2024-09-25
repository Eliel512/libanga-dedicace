const express = require('express');
const router = express.Router();

const sellerRouter = require('./seller.router');
const dedicationRouter = require('./dedication.router');
const optionRouter = require('./option.router');
const commentRouter = require('./comment.router');
const messageRouter = require('./message.router');

const auth = require('../middlewares/users/auth');

router.use('/sellers', sellerRouter);
router.use('/dedications', auth, dedicationRouter);
router.use('/options', auth, optionRouter);
router.use('/comments', commentRouter);
router.use('/message', messageRouter);

module.exports = router;
