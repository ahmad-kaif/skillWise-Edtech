import User from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password, role, skills, bio, profilePicture } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      bio,
      profilePicture,
    });

    const token = generateToken(user._id);

    // ✅ Set secure cross-site cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,           // required on Render (always HTTPS)
      sameSite: 'None',       // for cross-site requests
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token, // optionally send it in JSON too
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/',
      expires: new Date(0),
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  const { name, email, bio, profilePicture } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (bio !== undefined) user.bio = bio;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      bio: updatedUser.bio,
      profilePicture: updatedUser.profilePicture,
      skills: updatedUser.skills,
      isVerifiedMentor: updatedUser.isVerifiedMentor,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
