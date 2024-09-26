const express = require('express');
const router = express.Router();

const getAll = require('../controllers/flexcallback/getAll');

router.get('/', getAll);