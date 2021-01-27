const express = require("express");
const postCtrl = require('../controllers/post');
const auth     = require('../middleware/auth');
const router   = express.Router();

router.post("/:id", auth, postCtrl.getAllLikesByPostId);
router.post("/:id/:like", auth, postCtrl.likePost);

module.exports = router;