const Category = require('../../models/category');

module.exports = {
  index,
};

async function index(req, res) {
  try {
    const categories = await Category.find({}).populate('subcategories');
    res.json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
}