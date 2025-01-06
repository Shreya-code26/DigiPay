import React, { useState } from 'react';
import axios from 'axios';

const TransferMoney = () => {
    const [form, setForm] = useState({ recipientEmail: '', amount: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Reset messages
        setError('');
        setSuccess('');

        // Basic validation
        if (!form.recipientEmail || !form.amount || form.amount <= 0) {
            setError('Please provide a valid recipient email and amount.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/transfer',
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Successful transfer
            setSuccess('Transfer successful!');
            setForm({ recipientEmail: '', amount: '' }); // Reset form
        } catch (error) {
            console.error('Transfer Error:', error);

            const errorMessage = error.response
                ? error.response.data.message
                : 'Transfer failed. Please try again later.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Transfer Money</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Recipient Email"
                        value={form.recipientEmail}
                        onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        min="1"
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Send Money'}
                </button>
            </form>
        </div>
    );
};

export default TransferMoney;
