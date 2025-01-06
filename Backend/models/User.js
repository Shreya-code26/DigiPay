import mongoose from 'mongoose'; // Import mongoose
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

// Define the User schema
const UserSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, 'Name is required'], 
            trim: true 
        },
        email: { 
            type: String, 
            unique: true, 
            required: [true, 'Email is required'], 
            lowercase: true, 
            trim: true 
        },
        password: { 
            type: String, 
            required: [true, 'Password is required'] 
        },
        balance: { 
            type: Number, 
            default: 500, // Initialize balance with ₹500 by default
            min: [0, 'Balance cannot be negative'], // Ensure balance doesn't go negative
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Middleware to hash the password before saving the user
UserSchema.pre('save', async function (next) {
    try {
        // If the password is not modified, skip hashing
        if (!this.isModified('password')) return next();

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error);
    }
});

// Add a method to compare passwords for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
const User = mongoose.model('User', UserSchema);
export default User;
