const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/api/categories');

// Middleware to protect routes
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, categoriesCtrl.index);
router.post('/', ensureLoggedIn, categoriesCtrl.create);
router.delete('/:id', ensureLoggedIn, categoriesCtrl.delete);
router.put('/:id', ensureLoggedIn, categoriesCtrl.update);

module.exports = router;
