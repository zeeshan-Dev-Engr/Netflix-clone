import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/env_vars.js';

export const protectRoute = async (req, res, next) => { 
    try {
        const token= req.cookies["jwt-netflix"]

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized- no token provided' });
        }
        
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized- invalid token' });
        }
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized- user not found' });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error('Error in protectRoute middleware:', error.message);
        return res.status(401).json({ message: 'Unauthorized- token verification failed' });
    }
}