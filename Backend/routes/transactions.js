const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const router = express.Router();

// Transfer money
router.post('/transfer', async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) return res.status(404).json({ message: 'User not found' });
    if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({ sender: senderId, receiver: receiverId, amount });
    await transaction.save();

    res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
