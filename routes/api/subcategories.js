const express = require('express');
const router = express.Router();
const subcategoriesCtrl = require('../../controllers/api/subcategories');

// GET /api/subcategories
router.get('/', subcategoriesCtrl.index);

module.exports = router;
