const Expense = require('../../models/expense');

module.exports = {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense
};

async function getAllExpenses(req, res) {
  const query = { user: req.user._id };
  if (req.query.category) {
    query.category = new RegExp(req.query.category, 'i'); 
  }
  const expenses = await Expense.find(query);
  res.json(expenses);
}

async function createExpense(req, res) {
  try {
    req.body.user = req.user._id;
    req.body.category = req.body.category; 
    const expense = await Expense.create(req.body);
    res.json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ msg: 'Failed to create expense', error: error.message });
  }
}


async function deleteExpense(req, res) {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Expense deleted' });
}

async function updateExpense(req, res) {
  const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedExpense);
}

