import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User.model';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export interface JWTPayload {
  id: string;
  email: string;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Access token is required',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!process.env.JWT_SECRET) {
      res.status(500).json({
        success: false,
        error: 'JWT secret is not configured',
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    
    const user = await User.findById(decoded.id).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid token - user not found',
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: 'Token has expired',
      });
      return;
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        error: 'Invalid token',
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Authentication failed',
    });
  }
};

export const generateAccessToken = (payload: JWTPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is not configured');
  }
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT refresh secret is not configured');
  }
  
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT refresh secret is not configured');
  }
  
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JWTPayload;
};
