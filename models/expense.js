const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  amount: Number,
  description: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
