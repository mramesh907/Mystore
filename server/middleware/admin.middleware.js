import UserModel from '../models/user.model.js';
const admin = async (req, res, next) => {
    try {
       const userId= req.userId;
       const user = await UserModel.findById(userId);
       if (user.role !== 'ADMIN') {
           return res.status(401).json({
               message: 'Unauthorized access',
               error: true,
               success: false,
           });
       }
       next();
    } catch (error) {
        return res.status(401).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
export default admin;
