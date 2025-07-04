const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists." });

    await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    res.status(200).json({ message: "Login successful.", user: foundUser });
    
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

