const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const dotenv = require("dotenv")
dotenv.config({path:"./config.env"});


// Sign-up 
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Sign-in 
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ data: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token , user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
