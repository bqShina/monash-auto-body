const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 32,
  },
  password_hash: {
    type: String,
    required: true,
    maxlength: 600,
  },
  first_name: {
    type: String,
    required: false,
    maxlength: 40,
  },
  last_name: {
    type: String,
    required: false,
    maxlength: 40,
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
