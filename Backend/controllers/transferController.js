import User from '../models/User.js';

// Transfer Money logic
export const transferMoney = async (req, res) => {
    const { recipientEmail, amount } = req.body;
    const { id } = req.user;

    try {
        const recipient = await User.findOne({ email: recipientEmail });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        const sender = await User.findById(id);
        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        sender.balance -= amount;
        recipient.balance += amount;

        await sender.save();
        await recipient.save();

        res.status(200).json({ message: 'Transaction successful' });
    } catch (error) {
        res.status(500).json({ message: 'Transaction failed, please try again' });
    }
};
