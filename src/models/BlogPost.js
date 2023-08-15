const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model('Blogs', DataSchema);
module.exports = BlogPost;

