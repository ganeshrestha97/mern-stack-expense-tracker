const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subcategory', subcategorySchema);