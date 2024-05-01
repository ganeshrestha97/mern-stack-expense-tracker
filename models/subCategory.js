const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
