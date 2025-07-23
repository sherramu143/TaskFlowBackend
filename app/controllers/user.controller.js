const db=require("../models");
const { User } = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token (valid 1 hour)
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.name },
      "taskflowdemo", // make sure you have this in your .env
      { expiresIn: '1h' }
    );

    // Send token and user info (exclude password)
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.name,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Correct query to check if user exists by email
    const existingUser = await db.user.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await db.user.create({
      email,
      name: username,
      password: hashedPassword,
    });

    // Respond with safe user data (omit password)
    res.status(201).json({
      id: user.id,
      email: user.email,
      username: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
