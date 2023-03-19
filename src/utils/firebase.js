import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // your firebase configuration here
  apiKey: 'AIzaSyDwe3AX_rM53w41lQk9u8lZQU8Ypk-EFak',
  authDomain: 'sebl-farm-assist.firebaseapp.com',
  projectId: 'sebl-farm-assist',
  storageBucket: 'sebl-farm-assist.appspot.com',
  messagingSenderId: '797901349085',
  appId: '1:797901349085:web:b98edf2c40d9a46ea9bb34',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebaseConfig};
