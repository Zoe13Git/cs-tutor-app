const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const register = (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  createUser(username, email, hashedPassword, role, (err, userId) => {
    console.log("Reached authController")
    if (err) return res.status(500).json({ error: 'Registration failed' });
    res.status(201).json({ message: 'User registered successfully', userId });
  });
};

const login = (req, res) => {
  console.log("Login Reached authController")
  const { email, password } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    // Save user info in session
    // req.session.user = { id: user.id, role: user.role };
    res.json({ message: 'Login successful', user: { id: user.id, role: user.role }});
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logout successful' });
  });
};

const resetPassword = (req, res) => {
  const { email } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    // Here you would normally send an email with a reset link
    res.json({ message: 'Password reset link sent' });
  });
};

module.exports = { register, login, logout, resetPassword };
