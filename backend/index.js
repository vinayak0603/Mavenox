// === File: server/index.js ===
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  confirmed: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

// Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  tls: { rejectUnauthorized: false }
});

// Temporary memory store
const tempUsers = {};      // { [email]: { name, hashedPassword, confirmationCode } }
const resetCodes = {};     // { [email]: { code, createdAt } }

// Helper: send email
const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({ from: process.env.EMAIL, to, subject, text });
};

// === ROUTES ===

// Root check
app.get('/', (req, res) => {
  res.send('Auth API is running');
});

// Register
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  tempUsers[email] = { name, hashedPassword: hashed, confirmationCode: code };
  try {
    await sendEmail(email, 'Your Confirmation Code', `Code: ${code}`);
    res.status(200).json({ msg: 'Code sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Resend code
app.post('/resend-code', async (req, res) => {
  const { email } = req.body;
  const temp = tempUsers[email];
  if (!temp) return res.status(400).json({ error: 'No pending registration' });

  const newCode = Math.floor(100000 + Math.random() * 900000).toString();
  temp.confirmationCode = newCode;
  try {
    await sendEmail(email, 'Your New Confirmation Code', `Code: ${newCode}`);
    res.status(200).json({ msg: 'Code resent' });
  } catch {
    res.status(500).json({ error: 'Error resending code' });
  }
});

// Confirm code
app.post('/confirm', async (req, res) => {
  const { email, code } = req.body;
  const temp = tempUsers[email];
  if (!temp || temp.confirmationCode !== code)
    return res.status(400).json({ error: 'Invalid or expired code' });

  const user = new User({ name: temp.name, email, password: temp.hashedPassword, confirmed: true });
  await user.save();
  delete tempUsers[email];
  res.status(200).json({ msg: 'Confirmed and registered' });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ error: 'User not found' });
  if (!user.confirmed) return res.status(401).json({ error: 'User not confirmed' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Incorrect password' });

  const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.json({ token, name: user.name });
});

// Verify Token
app.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json({ name: decoded.name });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Request password reset
app.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  resetCodes[email] = { code, createdAt: Date.now() };
  try {
    await sendEmail(email, 'Reset Code', `Your reset code is: ${code}`);
    res.status(200).json({ msg: 'Reset code sent' });
  } catch {
    res.status(500).json({ error: 'Failed to send reset email' });
  }
});

// Confirm password reset
app.post('/confirm-reset', async (req, res) => {
  const { email, code, newPassword } = req.body;
  const reset = resetCodes[email];

  if (!reset || reset.code !== code || Date.now() - reset.createdAt > 10 * 60 * 1000) {
    return res.status(400).json({ error: 'Invalid or expired reset code' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { $set: { password: hashed } });
  delete resetCodes[email];
  res.status(200).json({ msg: 'Password updated' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
