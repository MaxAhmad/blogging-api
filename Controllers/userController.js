const User = require("./../Models/userModel");

exports.createUser = async (req, res) => {
  //await User.create(req.body)
  res.send({ message: "user created" });
};

exports.getUser = async (req, res) => {
  res.setHeader("application/json", "json");
  res.status(200).json({
    email: "example@mail.com",
  });
};

exports.getAllUser = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    users,
  });
};

exports.updateUser = async (req, res) => {};

exports.deleteUser = async (req, res) => {};
