import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import transferRoutes from './routes/transfer.js'; // Import transfer routes
import cors from 'cors';
import { protect } from './middleware/authMiddleware.js'; // Import auth middleware

dotenv.config();

const app = express();

// Connect to MongoDB
(async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
})();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api/users', userRoutes); // Routes for user registration and login
app.use('/api/users/transfer', protect, transferRoutes); // Protect transfer routes with auth middleware

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).send('✅ API is running...');
});

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Global Error Handler (Optional)
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
