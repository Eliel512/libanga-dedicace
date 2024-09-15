const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewares/users/isAdmin');
const auth = require('../middlewares/users/auth');

const postOne = require('../controllers/seller/postOne');
const getAll = require('../controllers/seller/getAll');
const deleteOne = require('../controllers/seller/deleteOne');

router.post('/', auth, isAdmin, postOne);
router.get('/', getAll);
router.delete('/', auth, isAdmin, deleteOne);

module.exports = router;