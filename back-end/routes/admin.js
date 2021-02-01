const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');
const admin = require('../middleware/admin');

// Routes
// We use the auth middleware on every routes to verify the token and authentify the requests
// We use the multer middleware on the routes that will need to handle image files
// POST //
router.get('/', admin, adminCtrl.getAllPublicationsAdmin);
router.get('/users', admin, adminCtrl.getAllUsersAdmin);


module.exports = router;