const express = require('express');
const router = express.Router();
const { getClinics, createClinic } = require('../controllers/clinicController');

// توجيه الطلبات للدوال اللي في الـ Controller
router.get('/', getClinics);
router.post('/', createClinic);

module.exports = router;