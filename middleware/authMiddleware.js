import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';

export const requireAuth = async (req, res, next) => {
    const token = req.cookies?.auth_token;
    console.log("middleware:works:", token)
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("token verified:", payload);
        const userFromDB = await User.findOne({
            _id: payload.id
        });
        console.log("Found user:", userFromDB)
        req.currentUser = userFromDB;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const requireAdmin = (req, res, next) => {
    if (!req.currentUser || req.currentUser.grade !== 0) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
