import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/features/counter/counterSlice';
import authReducer from '../components/features/auth/authSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth:authReducer
  },
});
