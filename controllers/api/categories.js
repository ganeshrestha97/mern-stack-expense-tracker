const Category = require('../../models/category');

module.exports = {
  index,
  create,
  delete: deleteOne,
  update
};

async function index(req, res) {
  const categories = await Category.find({user: req.user._id});
  res.json(categories);
}

async function create(req, res) {
  req.body.user = req.user._id;
  const category = await Category.create(req.body);
  res.json(category);
}

async function deleteOne(req, res) {
  await Category.findByIdAndDelete(req.params.id);
  res.json({msg: 'Category deleted'});
}

async function update(req, res) {
  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(updatedCategory);
}
