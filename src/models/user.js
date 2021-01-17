const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true
  }
});

module.exports = User;