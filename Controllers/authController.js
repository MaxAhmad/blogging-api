const crypto = require("crypto");
const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const User = require("./../Models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exist
  if (!email || !password) {
    res.status(400).json({
      message: "Please provide your email and password",
    });
    return;
  }
  //check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      message: "Incorrect email or Password",
    });
    return;
  }
  //if everything is ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.authorize = async (req, res, next) => {
  //Get token and check if it exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      message: "Please login to get access",
    });
    return;
  }

  //Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if users exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      message: "This User does not exist",
    });
    return;
  }

  req.user = currentUser;
  next();
};
