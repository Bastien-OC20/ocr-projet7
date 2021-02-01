const express  = require('express');
const router   = express.Router();
const postCtrl = require('../controllers/post');
const auth     = require('../middleware/auth');
const multer   = require('../middleware/multer-config');


// ROUTES //
router.post('/',      auth, multer, postCtrl.createPublication);
router.get('/',       auth, postCtrl.getAllPublication);
router.get('/:id',    auth, postCtrl.getOnePublication);
router.put('/:id',    auth, multer, postCtrl.modifyPublication);
router.delete('/:id', auth, postCtrl.deletePublication);


// EXPORT //

module.exports = router;