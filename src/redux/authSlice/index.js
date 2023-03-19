import {createSlice} from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {setCurrentUser, setLoading, setError} = authSlice.actions;

export const login = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch(setCurrentUser(userCredential.user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};

export const logout = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    await firebase.auth().signOut();
    dispatch(setCurrentUser(null));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
