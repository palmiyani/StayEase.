const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
// Mailer setup (use environment variables)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendEmail(to, subject, html) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP not configured; skipping email send');
    return;
  }
  await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, html });
}

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    // Send welcome email (best-effort)
    try {
      await sendEmail(email, 'Welcome to Airbnb Clone', `<p>Hi ${firstName},</p><p>Welcome aboard!</p>`);
    } catch (e) {
      console.warn('Welcome email failed:', e?.message);
    }

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login route (step 1: validate password and send code)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate 6-digit code and expiry 10 minutes
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    user.loginCode = code;
    user.loginCodeExpiresAt = expiresAt;
    await user.save();

    try {
      await sendEmail(user.email, 'Your login verification code', `<p>Your code is <b>${code}</b>. It expires in 10 minutes.</p>`);
    } catch (e) {
      console.warn('Login code email failed:', e?.message);
    }

    res.json({ message: 'Verification code sent to email' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Verify login code (step 2: issue JWT)
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.loginCode || !user.loginCodeExpiresAt) {
      return res.status(400).json({ message: 'No pending verification for this user' });
    }
    if (user.loginCode !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }
    if (new Date() > new Date(user.loginCodeExpiresAt)) {
      return res.status(400).json({ message: 'Verification code expired' });
    }

    // Clear code
    user.loginCode = null;
    user.loginCodeExpiresAt = null;
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Verify code error:', error);
    res.status(500).json({ message: 'Server error during code verification' });
  }
});

module.exports = router;