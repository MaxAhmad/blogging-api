const express = require("express");
const Blog = require("./Models/blogModel");

const blogRouter = require("./Routes/blogRoute");
const userRouter = require("./Routes/userRoute");

const app = express();

app.use(express.json());

app.use("/blog", blogRouter);
app.use("/user", userRouter);

app.all("*", async (req, res, next) => {
  const err = new Error(`cannot find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
