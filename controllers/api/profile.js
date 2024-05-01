const Profile = require('../../models/profile');

module.exports = {
  show
};

async function show(req, res) {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    res.json(profile);
  } catch (err) {
    res.status(400).json(err);
  }
}
