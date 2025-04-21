import dotenv from 'dotenv';
dotenv.config();

import {
    verifyAccessToken,
} from '../Service/token.service.js';

const authMiddleware = async (req, res, next) => {
    const skipPaths = ['/v1/login', '/v1/create-user', '/v1/refresh-token'];
    console.log('📍 Path yêu cầu:', req.path);

    // Bỏ qua xác thực với các path được phép truy cập công khai
    if (skipPaths.includes(req.path)) return next();

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có access token hoặc sai định dạng' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded; // gắn thông tin người dùng vào request
        return next();
    } catch (err) {
        console.error('❌ Lỗi xác thực token:', err.message);
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

export default authMiddleware;
