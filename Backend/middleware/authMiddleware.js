import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID from the decoded token to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Invalid Token Error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
