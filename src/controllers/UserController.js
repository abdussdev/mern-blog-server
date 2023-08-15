const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error:
          "This email is already registered. Please use a different email address.",
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object with all the provided information
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    console.log(newUser);
    // Respond with the complete user object
    res.json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      error: "An error occurred while registering the user.",
      specificError: error.message,
    });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the given username exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials. Please check your username and password.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials. Please check your username and password.",
      });
    }

    const tokenPayload = {
      userId: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, "MERNblog123", {
      expiresIn: "1d",
    });

    // Respond with the token
    res.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the login request." });
  }
};
