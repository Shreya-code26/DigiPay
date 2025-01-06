// Updated Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found, please login');
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Unable to fetch profile, please login again');
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Current Balance: ₹{user.balance}</p>
        </div>
    );
};

export default Dashboard;
