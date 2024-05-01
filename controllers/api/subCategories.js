const SubCategory = require('../../models/subCategory');

module.exports = {
  getSubCategories
};

async function getSubCategories(req, res) {
  try {
    const subCategories = await SubCategory.find();
    res.json(subCategories);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}