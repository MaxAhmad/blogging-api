const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: ObjectId,
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: [true, "Please provide your username"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, "Please Confirm your password"],
    validate: {
      validator: function (el) {
        //this only works on SAVE and CREATE
        return el === this.password;
      },
      message: "Password is not the same",
    },
    select: false,
  },

  photo: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 12);

  this.password = hash;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
