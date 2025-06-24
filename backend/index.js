const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://vinayakandhere4:niUjtjP7piNusVwA@cluster0.vtovevf.mongodb.net/authDemo?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  confirmed: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,        // Gmail address
    pass: process.env.EMAIL_PASS    // App-specific password
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Temporary in-memory store for unverified users
const tempUsers = {};  // { [email]: { name, hashedPassword, confirmationCode } }

// Register: store in memory + send code
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already exists' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();

    tempUsers[email] = { name, hashedPassword, confirmationCode };

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your Confirmation Code',
      text: `Your confirmation code is: ${confirmationCode}`
    });

    res.status(200).json({ msg: 'Confirmation code sent to your email' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Confirm: verify code and save user
app.post('/confirm', async (req, res) => {
  const { email, code } = req.body;

  const temp = tempUsers[email];
  if (!temp) return res.status(400).json({ error: 'No pending registration for this email' });

  if (temp.confirmationCode === code) {
    try {
      const user = new User({
        name: temp.name,
        email,
        password: temp.hashedPassword,
        confirmed: true,
      });

      await user.save();
      delete tempUsers[email]; // cleanup

      res.status(200).json({ msg: 'Email confirmed and user registered' });
    } catch (err) {
      console.error('Confirm Error:', err);
      res.status(500).json({ error: 'Error saving user after confirmation' });
    }
  } else {
    res.status(400).json({ error: 'Invalid confirmation code' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: 'User not found' });
    if (!user.confirmed) return res.status(401).json({ error: 'User not confirmed' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, name: user.name }, 'secret', { expiresIn: '1h' });
    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Verify token
app.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'secret');
    res.json({ name: decoded.name });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
