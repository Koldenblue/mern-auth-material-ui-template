import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import classReducer from './classSlice';

export default configureStore({
  reducer: {
    class: classReducer,
    user: userReducer,
  }
});
