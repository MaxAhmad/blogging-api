const moment = require("moment");

const Blog = require("./../Models/blogModel");


// Create Blog post handler
exports.createBlogPost = async (req, res, next) => {
  try {
    const { first_name, last_name } = req.user;

    const bodyObj = req.body;

    let words = bodyObj.body;
    let numberOfWords = 0;
    const averageWPM = 225; // average adult reading speed (words per minute WPM)
    numberOfWords += words.split(" ").length;
    const readTime = Math.round(numberOfWords / averageWPM);

    const blog = await Blog.create(bodyObj);

    blog.author = `${first_name}  ${last_name}`;
    blog.reading_time = readTime + " Minute read";
    await blog.save();

    res.status(201).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    return next(new Error(err.message))
  }
};

exports.getBlogPost = async (req, res) => {
  try {
    let count = 1;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        blog: null,
      });
    }

    let readCount = blog.read_count;
    readCount += count;

    blog.read_count = readCount;

    blog.save();
    //const blog = await Blog.findOne({ _id: req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    return next(new Error(err.message, 404))
  }
};

exports.getAllBlogPost = async (req, res) => {
  try {
    const { query } = req;
    let {
      post = "asc",
      postBy = "createdAt",
      state,
      createdAt,
      page = 1,
      limit = 20,
    } = query;

    const findQuery = {};

    if (createdAt) {
      findQuery.createdAt = {
        $gt: moment(createdAt).startOf("day").toDate(),
        $lt: moment(createdAt).endOf("day").toDate(),
      };
    }

    if (state) {
      findQuery.state = state;
    }

    const sortQueryItems = {};

    const sortList = postBy.split(",");

    for (const list of sortList) {
      if (post === "asc" && postBy) {
        sortQueryItems[list] = 1;
      }

      if (post === "desc" && postBy) {
        sortQueryItems[list] = -1;
      }
    }

    const blog = await Blog.find(findQuery)
      .sort(sortQueryItems)
      .skip(page)
      .limit(limit);
    res.json({
      status: "success",
      result: blog.length,
      data: {
        blog,
      },
    });
  } catch (err) {
    return next(new Error(err.message, 400))
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    //const blog = await Blog.findOne({ _id: req.params.id})
    let { state, description, tags, body, title, author } = req.body;
    console.log(blog.description, blog.state);

    if (blog.state > state) {
      return res.status(422).json({
        status: "fail",
        message: "Invalid operation",
      });
    }

    if (!state) {
      state = blog.state;
    } else {
      blog.state = state;
    }

    if (!description) {
      description = blog.description;
    } else {
      blog.description = description;
    }

    if (!tags) {
      tags = blog.tags;
    } else {
      blog.tags = tags;
    }

    if (!body) {
      body = blog.body;
    } else {
      blog.body = body;
    }

    if (!title) {
      title = blog.title;
    } else {
      blog.title = title;
    }

    if (!author) {
      author = blog.author;
    } else {
      blog.author = author;
    }

    await blog.save();

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    return next(new Error("Invalid Operation", 422))
  }
};

//Delete Blog Post
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        blog: null,
      },
    });
  } catch (err) {
    return next(new Error("Invalid Operation", 422))
  }
};

//Search API for Searching by author, title and tags
exports.searchBlog = async (req, res, next) => {
  const blog = await Blog.find({
    $or: [
      { author: { $regex: req.params.searchId } },
      { title: { $regex: req.params.searchId } },
      { tags: { $regex: req.params.searchId } },
    ],
  });

  res.status(200).json({
    status: "success",
    results: blog.length,
    data: {
      blog,
    },
  });
};
