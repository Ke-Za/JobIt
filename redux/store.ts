import { configureStore } from '@reduxjs/toolkit';
import searchJobsReducer from './feature/searchJobs/searchJobs';
import salariesInputsReducer from './feature/salariesInputs/salariesInputsSlice';
import themeReducer from './feature/theme/themeSlice';
import authReducer from './feature/auth/authSlice';

export const store = configureStore({
  reducer: {
    searchJobs: searchJobsReducer,
    salariesInputs: salariesInputsReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;