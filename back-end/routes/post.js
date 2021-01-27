const express = require('express');
const router  = express.Router();

const auth     = require('../middleware/auth');
const multer   = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get("/",               auth, postCtrl.getAllPost);
router.get("/user/:id/posts", auth, postCtrl.getAllPostByUserId);
router.get("/lasts",          auth, postCtrl.getLastPost);
router.get("/user/:id",       auth, postCtrl.getAllPostWithUserId);
router.get("/post/:id",       auth, postCtrl.getPostById);
router.post("/",              auth, multer, postCtrl.addPost);
router.delete("/:id",         auth, postCtrl.deletePost);

module.exports = router;