const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const blogRouter = require("./Routes/blogRoute");
const userRouter = require("./Routes/userRoute");
const viewRouter = require("./Routes/viewRoutes");
const { base } = require("./Models/blogModel");

const app = express();

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({origin: '*'}));

app.use(express.json());
app.use(cookieParser()); // Cookie-parser for making cookie available in the browser

//Api Routes
app.use("/", viewRouter);
app.use("/blog", blogRouter);
app.use("/user", userRouter);

//Middleware for Unhandled routes
app.all("*", async (req, res, next) => {
  const err = new Error(`cannot find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

//Global Error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    status: err.status,
    message: err.message,
  });
});


module.exports = app;
