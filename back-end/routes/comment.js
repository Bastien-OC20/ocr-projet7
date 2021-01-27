const express     = require("express");
const commentCtrl = require("../controllers/comment");


const auth     = require('../middleware/auth');
const multer   = require('../middleware/multer-config');
const router   = express.Router();


// router.get('/',         auth, commentCtrl.getAllComment)
router.get("/:id",      auth, commentCtrl.getAllCommentById);
// router.get('/post/:id', auth , commentCtrl.getCommentById)
router.post("/",        auth, commentCtrl.addComment);
router.delete("/:id",   auth, commentCtrl.deleteComment);
// router.post('/:id/like',auth, multer, commentCtrl.likeComment)

module.exports = router;