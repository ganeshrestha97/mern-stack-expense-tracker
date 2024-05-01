const Expense = require('../../models/expense');

module.exports = {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense
};

async function getAllExpenses(req, res) {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

async function createExpense(req, res) {
  try {
    req.body.user = req.user._id;
    const expense = await Expense.create(req.body);
    res.json(expense);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

async function deleteExpense(req, res) {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json({ msg: 'Expense deleted' });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

async function updateExpense(req, res) {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }
    res.json(expense);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}
