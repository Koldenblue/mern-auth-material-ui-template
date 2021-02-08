import { createSlice } from '@reduxjs/toolkit';

// the classes object, from the withStyles object created in App.js
export const classSlice = createSlice({
  name: 'class',
  initialState: {
    classes: null,
    loadingClasses: true
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
      state.loadingClasses = false;
    }
  }
});

export const selectClasses = state => state.class.classes;
export const selectLoadingClasses = state => state.class.loadingClasses;

export const { setClasses } = classSlice.actions

export default classSlice.reducer;