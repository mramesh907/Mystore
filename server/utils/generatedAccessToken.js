import jwt from 'jsonwebtoken';

const generatedAccessToken = async (userId) => {
  const accToken = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: '5h' }
  );
  return accToken;
};
export default generatedAccessToken;
