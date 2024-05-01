const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  amount: Number,
  description: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
