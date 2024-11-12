import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generatedRefreshToken = async (userId) => {
    const refToken = await jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '7d' }
    )
    const updateRefreshToken = await UserModel.updateOne(
        {_id: userId},
        {refreshToken: refToken}
    )

    return refToken
}
export default generatedRefreshToken