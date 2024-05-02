const express = require('express');
const router = express.Router();
const expensesCtrl = require('../../controllers/api/expenses');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, expensesCtrl.getAllExpenses);
router.post('/', ensureLoggedIn, expensesCtrl.createExpense);
router.delete('/:id', ensureLoggedIn, expensesCtrl.deleteExpense);
router.put('/:id', ensureLoggedIn, expensesCtrl.updateExpense);

module.exports = router;