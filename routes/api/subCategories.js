const express = require('express');
const router = express.Router();
const subcategoriesCtrl = require('../../controllers/api/subCategories');

// Middleware to protect routes
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, subcategoriesCtrl.index);

module.exports = router;