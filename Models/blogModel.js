const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      runValidators: false,
    },
    state: {
      type: Number,
      default: 1,
    },
    read_count: {
      type: Number,
      default: 0,
    },
    body: {
      type: String,
    },
    tags: {
      type: String,
    },
    reading_time: {
      type: String,
      select: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
