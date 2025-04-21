import dotenv from "dotenv";
dotenv.config()
import jwt from 'jsonwebtoken';
const auth = (req, res, next) => {
    const skipPaths = ['/login', '/api/create-user', '/']; 
    if (skipPaths.includes(req.path)) {
        return next();
    }
    if (req.headers && req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token hết hạn không truy cập được' });
        }
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Verify the token here (e.g., using JWT)
    // If valid, call next()
    // If invalid, return an error response
  
};

export default auth;