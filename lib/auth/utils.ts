import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthConfig } from './config';

// Password Hashing
export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

// Password Verification
export const verifyPassword = async (
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> => {
  return await compare(plainPassword, hashedPassword);
};

// JWT Token Generation
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, AuthConfig.JWT_SECRET, {
    expiresIn: AuthConfig.JWT_EXPIRATION
  });
};

// JWT Token Verification
export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, AuthConfig.JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
};