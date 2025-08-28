import { Response } from 'express';
import crypto from 'crypto';
import { User } from '../models/User.model';
import { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken, 
  AuthenticatedRequest 
} from '../middleware/auth.middleware';
import { createError, asyncHandler } from '../middleware/errorHandler';

export const register = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError('User already exists with this email', 409);
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate tokens
  const payload = { id: user._id.toString(), email: user.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.status(201).json({
    success: true,
    data: {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    },
  });
});

export const login = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw createError('Invalid email or password', 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw createError('Invalid email or password', 401);
  }

  // Generate tokens
  const payload = { id: user._id.toString(), email: user.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.json({
    success: true,
    data: {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    },
  });
});

export const refreshToken = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw createError('Refresh token is required', 400);
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    
    // Find user to ensure they still exist
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError('Invalid refresh token', 401);
    }

    // Generate new tokens
    const payload = { id: user._id.toString(), email: user.email };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    res.json({
      success: true,
      data: {
        tokens: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      },
    });
  } catch (error) {
    throw createError('Invalid refresh token', 401);
  }
});

export const logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // In a production app, you might want to blacklist the token
  // For now, we'll just return success as the client will remove the token
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

export const forgotPassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal if email exists or not for security
    res.json({
      success: true,
      message: 'If the email exists, a password reset link has been sent',
    });
    return;
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Save hashed token and expiration to user
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await user.save();

  // In a real app, you would send an email here
  // For demo purposes, we'll just return the token
  if (process.env.NODE_ENV === 'development') {
    res.json({
      success: true,
      message: 'Password reset token generated',
      resetToken, // Only include in development
    });
  } else {
    res.json({
      success: true,
      message: 'If the email exists, a password reset link has been sent',
    });
  }
});

export const resetPassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { token, password } = req.body;

  if (!token || !password) {
    throw createError('Token and password are required', 400);
  }

  // Hash the token to compare with stored hash
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user with matching token that hasn't expired
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  }).select('+resetPasswordToken +resetPasswordExpires');

  if (!user) {
    throw createError('Invalid or expired reset token', 400);
  }

  // Update password and clear reset token fields
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({
    success: true,
    message: 'Password reset successfully',
  });
});

export const getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
});
