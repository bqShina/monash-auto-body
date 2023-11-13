require("dotenv").config();
const mongoose = require("mongoose");
// const { mongodbUrl } = require("./config");
const uri = process.env.MONGODB_URI;
const User = require("./models/user");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });

const db = mongoose.connection;

// Event handling for database connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  seedData();
  console.log("Connected to MongoDB database");
});

const seedData = async () => {
  try {
    const count = await User.countDocuments({ username: "admin" });

    if (count > 0) {
      console.log("Seed data already exists");
      return;
    }

    await fetchUser();
  } catch (error) {
    console.error("Error checking existing user:", error);
  }
};

const fetchUser = async () => {
  try {
    const hash = await bcrypt.hash("admin", SALT_ROUNDS);

    const user = new User({
      username: "admin",
      password_hash: hash,
      first_name: "first",
      last_name: "last",
    });

    const result = await user.save();
  } catch (error) {
    console.error("Error inserting user:", error);
  }
};

module.exports = db; // Export the Mongoose connection
