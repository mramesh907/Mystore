import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(' ')[1]; ///Bearer token ["Bearer", "token"]

    if (!token) {
      return res.status(401).json({
        message: 'Provide token',
        error: true,
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        message: 'Unauthorized access',
        error: true,
        success: false,
      });
    }
    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export default auth;
