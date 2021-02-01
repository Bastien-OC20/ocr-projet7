// Imports
const express         = require('express');
const router          = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth            = require('../middleware/auth');
const multer          = require('../middleware/multer-config');

// Routes
// We use the auth middleware on every routes to verify the token and authentify the requests
// We use the multer middleware on the routes that will need to handle image files
// POST //
router.post('/',      auth, multer, publicationCtrl.createPublication);
router.get('/',       auth, publicationCtrl.getAllPublication);
router.get('/:id',    auth, publicationCtrl.getOnePublication);
router.put('/:id',    auth, multer, publicationCtrl.modifyPublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);

module.exports = router;