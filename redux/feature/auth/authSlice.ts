import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the authentication state
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    email?: string;
    name?: string;
  } | null;
  token: string | null;
  error: string | null;
}

// Initial state for authentication
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login action
    login: (state, action: PayloadAction<{ user: AuthState['user'], token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    
    // Logout action
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    
    // Set authentication error
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setAuthError } = authSlice.actions;
export default authSlice.reducer;