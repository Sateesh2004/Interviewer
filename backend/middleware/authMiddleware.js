// authMiddleware.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;  // Extract token from cookies

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, "12345678qwert"); // Verify the token
        req.user = decoded;  // Add the decoded user info to the request
        next();  // Call the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

export default verifyToken;
