const express = require('express');
const expensesCtrl = require('../controllers/expensesController');
const router = express.Router();

router.get('/', expensesCtrl.getAllExpenses);
router.post('/', expensesCtrl.createExpense);
router.delete('/:id', expensesCtrl.deleteExpense);
router.put('/:id', expensesCtrl.updateExpense);

module.exports = router;
