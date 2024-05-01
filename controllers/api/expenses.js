const Expense = require('../../models/expense');

module.exports = {
  index,
  create
};

async function index(req, res) {
  try {
    const expenses = await Expense.find({ user: req.user._id }).populate('subcategory');
    res.json(expenses);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const expense = await Expense.create(req.body);
    res.json(expense);
  } catch (err) {
    res.status(400).json(err);
  }
}