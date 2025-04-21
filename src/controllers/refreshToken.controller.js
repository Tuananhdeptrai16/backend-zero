import { RefreshTokenService } from "../Service/refreshToken.service.js";

export const handleRefreshToken = async (req, res) => {

    try {
        const { refreshToken } = req.body;
        const result = await RefreshTokenService(refreshToken);
        console.log('result', result);
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
