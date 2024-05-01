const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/profiles (authenticated users only)
router.get('/:userId', ensureLoggedIn, profilesCtrl.show);

module.exports = router;