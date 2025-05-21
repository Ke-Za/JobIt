import { EmailLoginCredentials } from './config';
import { hashPassword, verifyPassword, generateToken } from './utils';

// Mock User Database (In a real app, this would be a PostgreSQL database)
let users: Array<{ id: string; email: string; password: string }> = [];

export class AuthService {
  static async register(credentials: EmailLoginCredentials): Promise<string> {
    const { email, password } = credentials;
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const newUser = {
      id: Date.now().toString(), // Simple unique ID generation
      email,
      password: hashedPassword
    };
    
    users.push(newUser);
    
    // Generate token
    return generateToken(newUser.id);
  }

  static async login(credentials: EmailLoginCredentials): Promise<string> {
    const { email, password } = credentials;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    return generateToken(user.id);
  }

  // For testing purposes: Reset the user database
  static resetUsers(): void {
    users = [];
  }
}