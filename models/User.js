const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    require: true,
  },
  email: {
    type: "string",
    require: true,
  },
  password: {
    type: "string",
    require: true,
  },
  avatar: {
    type: "string",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
