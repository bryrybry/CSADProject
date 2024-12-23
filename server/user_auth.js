import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

const router = express.Router();

// register route
router.post('/register', async (req, res) => {
    console.log('Received request at /auth/register');
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      console.log('User created successfully');
      console.log(`2. sending ${username} + ${email} + ${password}`)
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error saving user to DB:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
    
  });
  
  // login route
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const trimmedPassword = password.trim();
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.error({ error: 'User not found' });
        return res.status(401).json({ error: 'User not found' });
      }
      
      const passwordMatch = await bcrypt.compare(trimmedPassword, user.password);
      if (!passwordMatch) {
        console.error({ error: 'Invalid credentials' });
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      res.status(200).json({ token, username: user.username }); // send token to frontend
    } catch (error) {
      console.error({ error: 'Login error' });
      res.status(500).json({ error: 'Login error' });
    }
  });

export default router