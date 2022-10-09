const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  customToken: {
    type: String,
    default: null,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
