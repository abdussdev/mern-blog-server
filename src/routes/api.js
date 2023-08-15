const express = require("express");
const router = express.Router();
const blogController = require("../controllers/BlogController");
const userController = require("../controllers/UserController");
const commentController = require("../controllers/CommentController")
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware")

// User router
router.post("/register", userController.register)
router.post("/login", userController.login)

// Comment router
router.post("/posts/comments/:id", AuthVerifyMiddleware, commentController.createComment);
router.get("/posts/comments/:id", AuthVerifyMiddleware, commentController.getCommentsByPostId);

// Blog router
router.get("/posts", blogController.allBlogs);
router.get("/posts/:id", blogController.singleBlog);
router.post("/post", AuthVerifyMiddleware, blogController.createBlog);
router.patch("/posts/:id", AuthVerifyMiddleware, blogController.updateBlog);
router.delete("/posts/:id", AuthVerifyMiddleware, blogController.deleteBlog);

module.exports = router;
