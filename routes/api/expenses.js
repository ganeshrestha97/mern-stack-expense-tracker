const express = require('express');
const router = express.Router();
const expensesCtrl = require('../../controllers/api/expenses');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/expenses (authenticated users only)
router.get('/', ensureLoggedIn, expensesCtrl.index);

// POST /api/expenses (authenticated users only)
router.post('/', ensureLoggedIn, expensesCtrl.create);

module.exports = router;