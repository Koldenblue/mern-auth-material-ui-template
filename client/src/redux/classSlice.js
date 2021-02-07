import { createSlice } from '@reduxjs/toolkit';

// the classes object, from the withStyles object created in App.js
export const classSlice = createSlice({
  name: 'class',
  initialState: {
    classes: null
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    }
  }
});

export const selectClasses = state => state.class.classes;

export const { setClasses } = classSlice.actions

export default classSlice.reducer;