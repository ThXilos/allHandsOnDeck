const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
  },
  skills: {
    type: [String],
    require: true,
  },
  social: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  availability: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  hasAccomendation: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
