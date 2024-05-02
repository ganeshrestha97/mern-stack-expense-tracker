const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new mongoose.Schema({
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});
module.exports = mongoose.model('SubCategory', subCategorySchema);
