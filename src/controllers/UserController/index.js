import { PoolConnection } from "../../config/database.js";
import { hashPassword } from "../../Service/hash.js";
import { createUserService, getUserService, loginUserService } from "../../Service/UserService/index.js";
export const getUser = async (req, res) => {
    try {
        const users = await getUserService();
        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const postCreateUser = async (req, res) => {
    try {
        const userData = req.body;
        userData.password = await hashPassword(userData.password);
        let result = await createUserService(userData);
        return res.status(201).json({
            code: 0,
            message: "success",
            data: result
        });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const handleLogin = async (req, res) => {

    try {
        const result = await loginUserService(req.body);
        if (result.error) {
            return res.status(400).json({
                code: 1,
                message: result.error,
            });
        }
        return res.status(200).json({
            code: 0,
            message: "success",
            data: result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const PersonID = req.query.id;;
        if (!PersonID) {
            return res.status(400).json({ error: "Thiếu PersonID!" });
        }
        const [results] = await PoolConnection.query(
            'DELETE FROM Persons where PersonID= ?', [PersonID]
        );
        return res.status(200).json({
            code: 0,
            message: "Người dùng đã được xóa thành công!",
            data: { deletedId: PersonID }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
