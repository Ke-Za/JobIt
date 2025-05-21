import { describe, it, expect } from 'vitest';
import { AuthService } from './service';
import { verifyToken } from './utils';

describe('Authentication Service', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'SecurePass123!'
  };

  it('should register a new user', async () => {
    const token = await AuthService.register(testUser);
    const decoded = verifyToken(token);
    
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBeDefined();
  });

  it('should login with valid credentials', async () => {
    // First register the user
    await AuthService.register(testUser);

    // Then login
    const token = await AuthService.login(testUser);
    const decoded = verifyToken(token);
    
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBeDefined();
  });

  it('should fail login with invalid credentials', async () => {
    await expect(AuthService.login({
      email: 'wrong@example.com',
      password: 'WrongPassword123!'
    })).rejects.toThrow('Invalid credentials');
  });

  it('should prevent duplicate user registration', async () => {
    await AuthService.register(testUser);
    
    await expect(AuthService.register(testUser))
      .rejects.toThrow('User already exists');
  });
});