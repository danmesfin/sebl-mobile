import {createSlice} from '@reduxjs/toolkit';
import firebase from '../../../firebaseConfig';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: state => {
      state.user = null;
    },
  },
});

// Async action to log in a user
export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const {user} = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Async action to sign up a new user
export const signUpUser = (email, password) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const {user} = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Async action to sign out the current user
export const signOutUser = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    await firebase.auth().signOut();
    dispatch(clearUser());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Export the actions and reducer
export const {setUser, setLoading, setError, clearUser} = authSlice.actions;
export default authSlice.reducer;
