import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    success: null, // Add the success state
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSuccess: (state, action) => {
      // Define the setSuccess action
      state.error = null;
      state.success = action.payload;
    },
    clearUser: state => {
      state.isLoading = false;
      state.user = null;
    },
  },
});

// Export the actions and reducer
export const {setUser, setLoading, setError, setSuccess, clearUser} =
  authSlice.actions;
export default authSlice.reducer;
