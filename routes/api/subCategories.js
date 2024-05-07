const express = require('express');
const router = express.Router();
const subCategoriesCtrl = require('../../controllers/api/subCategories');

// Middleware to protect routes
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, subCategoriesCtrl.index);
router.post('/', ensureLoggedIn, subCategoriesCtrl.create);
router.delete('/:id', ensureLoggedIn, subCategoriesCtrl.delete);
router.put('/:id', ensureLoggedIn, subCategoriesCtrl.update);

module.exports = router;