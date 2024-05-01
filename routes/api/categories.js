const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/api/categories');

// GET /api/categories
router.get('/', categoriesCtrl.index);

module.exports = router;