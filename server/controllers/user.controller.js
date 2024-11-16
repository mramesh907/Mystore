import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generatedOtp from '../utils/generatedOtp.js';
import forgotPasswordEmailTemplate from '../utils/forgotPasswordEmailTemplate.js';
import jwt from 'jsonwebtoken';

// register controller
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        error: true,
        success: false,
      });
    }
    const userCheck = await UserModel.findOne({ email });
    if (userCheck) {
      return res.status(400).json({
        message: 'User already exists',
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: 'Verify email from Mystore',
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });

    return res.status(200).json({
      message: 'User Registered successfully',
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

// verify email controller
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: 'User not found or url is invalid',
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verifyEmail: true }
    );

    return res.status(200).json({
      message: 'User verified successfully',
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// login controller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User not registered',
        error: true,
        success: false,
      });
    }

    if (user.status !== 'Active') {
      return res.status(400).json({
        message: 'Contact to admin for activation',
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: 'Invalid password',
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      lastLoginDate : new Date()
    }); 
    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };

    res.cookie('accessToken', accessToken, cookiesOptions);
    res.cookie('refreshToken', refreshToken, cookiesOptions);

    return res.status(200).json({
      message: 'User logged in successfully',
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// logout controller
export async function logoutController(req, res) {
  try {
    const userid = req.userId; //comeing from middlewear

    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };
    res.clearCookie('accessToken', cookiesOptions);
    res.clearCookie('refreshToken', cookiesOptions);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(
      { _id: userid },
      { refreshToken: '' }
    );

    return res.status(200).json({
      message: 'User logged out successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// upload user avatar controller
export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId; //comeing from the auth middleware
    const image = req.file; //multer middleware

    // if u use uploader.upload
    // const upload = await uploadImageCloudinary(image.path);
    const upload = await uploadImageCloudinary(image.path);

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      { avatar: upload.url }
    );

    return res.status(200).json({
      message: 'Image uploaded successfully',
      error: false,
      success: true,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// update user details
export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId; //comeing from the auth middleware
    const { name, email, mobile, password } = req.body;
    let hashPassword = '';
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return res.status(200).json({
      message: 'User details updated successfully',
      error: false,
      success: true,
      data: updateUser
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// forgot password controller without login
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Email not registered',
        error: true,
        success: false,
      });
    }
    const otp = generatedOtp();
    const expireTime = new Date() + 60 * 60 * 1000; //1hr

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgotPasswordOtp: otp,
      forgotPasswordExpiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: 'Forgot Password from Mystore',
      html: forgotPasswordEmailTemplate({ name: user.name, otp: otp }),
    });

    return res.status(200).json({
      message: 'Otp sent successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// verify forgot password otp
export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: 'Please provide email and otp',
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Email not registered',
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();
    const expiryTime = user.forgotPasswordExpiry;

    if (currentTime > expiryTime) {
      return res.status(400).json({
        message: 'Otp expired',
        error: true,
        success: false,
      });
    }
    if (otp !== user.forgotPasswordOtp) {
      return res.status(400).json({
        message: 'Invalid otp',
        error: true,
        success: false,
      });
    }

    // if otp is not expired
    // otp === forgotPasswordOtp then,
    // update the password and send a success response
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      forgotPasswordOtp: "",
      forgotPasswordExpiry : ""
    });
    return res.json({
      message: 'Verify Otp Successfully',
      error: false,
      success: true,
    });

    // const newPassword = await bcrypt.hash(password, 10)
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// reset the password
export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: 'Provide required fields email , newPassword, confirmPassword',
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Email not registered',
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'New password and confirm password should be same',
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    const update = await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.status(200).json({
      message: 'Password reset successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Refresh Token Api
export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(' ')[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: 'Invalid token',
        error: true,
        success: false,
      });
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: 'Expired token',
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generatedAccessToken(userId);
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    return res.status(200).json({
      message: 'Token refreshed successfully',
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get login user details
export async function userDetails(req,res){
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select(
      '-password -refreshToken'
    );

    return res.status(200).json({
      message: 'User details fetched successfully',
      error: false,
      success: true,
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
