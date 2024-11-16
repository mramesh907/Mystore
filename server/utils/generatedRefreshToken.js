import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const generatedRefreshToken = async (userId) => {
  const refToken = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  const updateRefreshToken = await UserModel.updateOne(
    { _id: userId },
    { refreshToken: refToken }
  );

  return refToken;
};
export default generatedRefreshToken;
