import jwt from 'jsonwebtoken';

const generatedAccessToken = async (userId) => {
  const accToken = await jwt.sign(
    { id: userId,
      email: userId.email,
      name: userId.name
     },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return accToken;
};
export default generatedAccessToken;
