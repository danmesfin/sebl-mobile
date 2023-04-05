import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'DiseaseDetection',
  initialState: {
    image: null,
    disease: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearImage: state => {
      state.user = null;
    },
  },
});

// Async action to log in a user
export const loadImage = (email, password) => async dispatch => {};

// Async action to sign up a new user
export const detectDisease = (email, password) => async dispatch => {
  //   try {
  //     dispatch(setLoading(true));
  //     const {user} = await firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password);
  //     dispatch(setUser(user));
  //   } catch (error) {
  //     dispatch(setError(error.message));
  //   }
};

// Async action to sign out the current user
export const clearImage = () => async dispatch => {
  //   try {
  //     dispatch(setLoading(true));
  //     await firebase.auth().signOut();
  //     dispatch(clearUser());
  //   } catch (error) {
  //     dispatch(setError(error.message));
  //   }
};

// Export the actions and reducer
export const {setUser, setLoading, setError, clearUser} = authSlice.actions;
export default authSlice.reducer;
