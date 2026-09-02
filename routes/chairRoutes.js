const express = require('express');
const router = express.Router();
const { createChair } = require('../controllers/chairController');

router.post('/', createChair);

module.exports = router;