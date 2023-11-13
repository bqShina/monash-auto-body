const db = require("../database");
const bcrypt = require("bcrypt");
const User = require("../database/models/user");

const SALT_ROUNDS = 10;

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.username);
  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.query.username });

  if (
    user === null ||
    (await bcrypt.compare(req.query.password, user.password_hash)) === false
  ) {
    // Login failed.
    res.json(null);
  } else {
    // Create a plain JavaScript object from the Mongoose document.
    let userObject = user.toObject();

    const userResponse = {
      username: userObject.username,
      firstName: userObject.first_name,
      lastName: userObject.last_name,
    };

    res.json(userResponse);
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

  const user = new User({
    username: req.body.username,
    password_hash: hash,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
  });

  const result = await user.save();
  res.send(result);
};

// Update user information

exports.update = async (req, res) => {
  const username = req.params.username;
  try {
    // Find the user by username
    const result = await User.findOneAndUpdate(
      { username: username },
      {
        $set: {
          first_name: req.body.firstName,
          last_name: req.body.lastName,
        },
      }
    );

    console.log("update successfully");
    res.send(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user password

exports.updatePassword = async (req, res) => {
  const username = req.params.username;
  const oldPassword = req.body.oldPassword;
  try {
    // Find the user by username
    const user = await User.findOne({ username: username });
    if ((await bcrypt.compare(oldPassword, user.password_hash)) === true) {
      const hash = await bcrypt.hash(req.body.newPassword, SALT_ROUNDS);
      user.set({ password_hash: hash });
      user.save();
      res.send({ message: "success" });
      console.log("update password work");
      return;
    }

    res.json(null);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a user
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findByIdAndRemove(id);
    res.send(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
