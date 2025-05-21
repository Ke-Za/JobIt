import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout, setAuthError } from './authSlice';

describe('Auth Slice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
  };

  it('should return the initial state', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    
    expect(store.getState().auth).toEqual(initialState);
  });

  it('should handle login', () => {
    const previousState = initialState;
    const user = { id: '1', email: 'test@example.com', name: 'Test User' };
    const token = 'test-token';

    const nextState = authReducer(
      previousState, 
      login({ user, token })
    );

    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.user).toEqual(user);
    expect(nextState.token).toBe(token);
    expect(nextState.error).toBeNull();
  });

  it('should handle logout', () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      token: 'test-token',
      error: null,
    };

    const nextState = authReducer(loggedInState, logout());

    expect(nextState).toEqual(initialState);
  });

  it('should handle setting auth error', () => {
    const errorMessage = 'Authentication failed';
    
    const nextState = authReducer(
      initialState, 
      setAuthError(errorMessage)
    );

    expect(nextState.error).toBe(errorMessage);
  });
});