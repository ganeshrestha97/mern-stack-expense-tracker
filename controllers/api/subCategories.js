const SubCategory = require('../../models/subCategory');

module.exports = {
  index,
  create,
  delete: deleteOne,
  update
};

async function index(req, res) {
  const subCategories = await SubCategory.find({user: req.user._id});
  res.json(subCategories);
}

async function create(req, res) {
  req.body.user = req.user._id;
  const subCategory = await SubCategory.create(req.body);
  res.json(subCategory);
}

async function deleteOne(req, res) {
  await SubCategory.findByIdAndDelete(req.params.id);
  res.json({msg: 'SubCategory deleted'});
}

async function update(req, res) {
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(updatedSubCategory);
}