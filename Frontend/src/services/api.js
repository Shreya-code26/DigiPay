import axios from 'axios';

// Set up the base URL for the API
const API_URL = 'http://localhost:5000/api/users';

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000, // Set a timeout of 5 seconds for the API request
});

// Register a user
export const registerUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/register', formData);
        return response.data; // Return the response data directly
    } catch (error) {
        if (error.response?.data?.message?.includes('password')) {
            throw new Error('Password mismatch error. Please check your credentials.');
        }
        console.error('Registration error:', error);
        throw new Error(error.response?.data?.message || 'Registration failed.');
    }
};

// Log in a user
export const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/login', formData);
        return response.data; // Return the response data directly
    } catch (error) {
        if (error.response?.data?.message?.includes('password')) {
            throw new Error('Incorrect password. Please try again.');
        }
        console.error('Login error:', error);
        throw new Error(error.response?.data?.message || 'Login failed.');
    }
};

// Get user profile
export const getProfile = async (token) => {
    try {
        const response = await axiosInstance.get('/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            alert('Unauthorized! Please log in again.');
            window.location.href = '/login';
        }
        throw new Error(error.response?.data?.message || 'Failed to fetch profile.');
    }
};

// Transfer money between users
export const transferMoney = async (token, formData) => {
    try {
        const response = await axiosInstance.post('/transfer', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the response data directly
    } catch (error) {
        if (error.response?.data?.message?.includes('Insufficient')) {
            throw new Error('Insufficient balance. Please check your account balance.');
        }
        console.error('Transfer error:', error);
        throw new Error(error.response?.data?.message || 'Transfer failed.');
    }
};
