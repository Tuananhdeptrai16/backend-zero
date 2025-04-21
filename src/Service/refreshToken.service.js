
  
import { generateAccessToken, verifyRefreshToken } from './token.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const RefreshTokenService = async (refreshToken) => {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const userInfo = {
        id: decoded.id,
        username: decoded.username, 
        email: decoded.email
      };
      const newAccessToken = generateAccessToken(userInfo);
      return {
        userInfo: userInfo,
        accessToken: newAccessToken,
      };
    } catch (error) {
      console.error("Lỗi khi xử lý refresh token:", error);
      return { error: 'Refresh token không hợp lệ hoặc đã hết hạn' };
    }
  };
  