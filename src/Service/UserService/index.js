import { PoolConnection } from "../../config/database.js";
import { comparePassword } from "../hash.js";
import dotenv from 'dotenv';
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from "../token.service.js";
dotenv.config()

export const getUserService = async () => {
    let result = [];
    try {
        const [rows] = await PoolConnection.query('select * from users u');
        result = rows;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
    return result;
};
export const createUserService = async (userData) => {
    let result = null;
    try {
        const { email, password, username, display_name, avatar, role, is_active, verify_token } = userData;
        const [checkUser] = await PoolConnection.query(
            `SELECT 'email' AS type FROM users WHERE email = ?
             UNION
             SELECT 'username' AS type FROM users WHERE username = ?`,
            [email, username]
        );
        if (checkUser.length > 0) {
            if (checkUser.some(user => user.type === 'email')) {
                return { error: "Email đã tồn tại" };
            }
            if (checkUser.some(user => user.type === 'username')) {
                return { error: true, message: "Username đã tồn tại" };
            }
        }
        const [rows] = await PoolConnection.query(
            `INSERT INTO users 
            (id, email, password, username, display_name, avatar, role, is_active, verify_token, created_at) 
            VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [email, password, username, display_name, avatar, role, is_active, verify_token]
        );
        console.log('check rows', rows);
        result = rows;
    } catch (error) {
        console.error("Error creating user:", error);
    }
    return result;
}

export const loginUserService = async (userData) => {
    try {
        const { username, password } = userData;

        const [rows] = await PoolConnection.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return { error: "username không tồn tại" };
        }

        const user = rows[0];

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return { error: "Sai mật khẩu" };
        }
        console.log('user', user);
        const userInfo = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        const accessToken = generateAccessToken(userInfo);
        const decoded = verifyAccessToken(accessToken);
        console.log('>>>>>>>>>>>>>>accessToken', decoded);
        const refreshToken = generateRefreshToken(userInfo);

        return {
            accessToken,
            refreshToken,
            user: userInfo
        };
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        return { error: "Đăng nhập thất bại, lỗi server" };
    }
};