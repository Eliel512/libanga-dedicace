const express = require('express');
const router = express.Router();

const sellerRouter = require('./seller.router');
const dedicationRouter = require('./dedication.router');
const optionRouter = require('./option.router');
const commentRouter = require('./comment.router');
const messageRouter = require('./message.router');
const transactionRouter = require('./flex.router');

const auth = require('../middlewares/users/auth');
const isAdmin = require('../middlewares/users/isAdmin');

router.use('/sellers', sellerRouter);
router.use('/dedications', auth, dedicationRouter);
router.use('/options', optionRouter);
router.use('/comments', commentRouter);
router.use('/message', messageRouter);
router.use('/transactions', auth, isAdmin, transactionRouter);

module.exports = router;
