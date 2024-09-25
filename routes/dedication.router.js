const express = require('express');
const router = express.Router();

const postOne = require('../controllers/dedication/postOne');
const getAllForOne = require('../controllers/dedication/getAllForOne');
const getOne = require('../controllers/dedication/getOne');

const postOneMiddleware = require('../middlewares/dedication/postOne');
const createDedication = require('../middlewares/dedication/createDedication');
const flexpay = require('../middlewares/dedication/flexpay');

router.get('/all', getAllForOne);
router.get('/', getOne);
router.post('/', postOneMiddleware, createDedication, flexpay, postOne);

module.exports = router;