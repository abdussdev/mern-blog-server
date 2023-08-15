const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const author = req.user.name;
    const comment = await Comment.create({ text, author, postId });
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the comment." });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId }); // Fetch comments with the specified postId
    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "Comments not found" });
    }
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching comments." });
  }
};
