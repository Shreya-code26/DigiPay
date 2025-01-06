import express from 'express';
import { transferMoney } from '../controllers/transferController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the protect middleware

const router = express.Router();

// Transfer money route
// This route is protected by the 'protect' middleware to ensure only authenticated users can access it
router.post('/', protect, transferMoney);

export default router;
