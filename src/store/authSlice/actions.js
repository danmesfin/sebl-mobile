import {firebase} from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser, setLoading, setError, clearUser, setSuccess} from './index';
import axios from 'axios';

// Async action to log in a user
export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const {user} = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch(setUser(user));
    AsyncStorage.setItem('user', JSON.stringify(user))
      .then(() => {
        // User saved to local storage
      })
      .catch(error => {
        console.log('Error saving user to local storage:', error);
      });
  } catch (error) {
    dispatch(setError(error.message));
  }
};
// restore user
export const restoreUser = user => dispatch => {
  dispatch(setUser(user));
};

// modified set user
export const setUserAction = user => dispatch => {
  // Save the user to the local storage
  AsyncStorage.setItem('user', JSON.stringify(user))
    .then(() => {
      dispatch(setUser(user));
    })
    .catch(error => {
      dispatch(setError(error.message));
    });
};
// clear user
export const clearUserActoin = () => dispatch => {
  // Remove the user from the local storage
  AsyncStorage.removeItem('user')
    .then(() => {
      dispatch(clearUser());
    })
    .catch(error => {
      dispatch(setError(error.message));
    });
};

// Async action to sign up a new user
export const signUpUser = (email, password, name) => async dispatch => {
  console.log('register user started');
  try {
    dispatch(setLoading(true));
    console.log('loading true', email + password);
    const {user} = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log('register Auth user', user);

    console.log('loading firestore', email + password);
    // Create a user document in the Firestore "users" collection
    // const userResponse = await firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(user.uid)
    //   .set({
    //     email,
    //     name,
    //   });
    const myUser = firebase.auth().currentUser;
    if (myUser) {
      const token = await myUser.getIdToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        'https://sebl.onrender.com/users/register',
        {email, name},
        {headers},
      );
      console.log('created user at firestore', response);
      dispatch(setUser(user));

      // Registration successful
      console.log('User registered successfully!');
    }
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

export const resetPassword = email => async dispatch => {
  try {
    dispatch(setLoading(true));

    await firebase.auth().sendPasswordResetEmail(email);

    dispatch(setSuccess(true));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
