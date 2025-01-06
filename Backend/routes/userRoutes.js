import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js'; // Import user controller functions

const router = express.Router();

// Route for user registration
// Handles user creation and sets initial balance
router.post('/register', registerUser);

// Route for user login
// Authenticates user and returns a JWT token
router.post('/login', loginUser);

export default router; // Default export
