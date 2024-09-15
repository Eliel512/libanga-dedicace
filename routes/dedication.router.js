const express = require('express');
const router = express.Router();

const postOne = require('../controllers/dedication/postOne');
const getAllForOne = require('../controllers/dedication/getAllForOne');
const getOne = require('../controllers/dedication/getOne');

router.post('/', postOne);
router.get('/all');
router.get('/');

module.exports = router;