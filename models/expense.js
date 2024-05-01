const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);