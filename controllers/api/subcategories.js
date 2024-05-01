const Subcategory = require('../../models/subcategory');

module.exports = {
  index
};

async function index(req, res) {
  try {
    const subcategories = await Subcategory.find({});
    res.json(subcategories);
  } catch (err) {
    res.status(400).json(err);
  }
}