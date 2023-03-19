import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyDwe3AX_rM53w41lQk9u8lZQU8Ypk-EFak',
      authDomain: 'sebl-farm-assist.firebaseapp.com',
      projectId: 'sebl-farm-assist',
      storageBucket: 'sebl-farm-assist.appspot.com',
      messagingSenderId: '797901349085',
      appId: '1:797901349085:web:b98edf2c40d9a46ea9bb34',
    });
  }
  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('User signed up'))
      .catch(error => console.log(error));
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('User logged in'))
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginVertical: 4,
    minWidth: 200,
  },
});

export default LoginScreen;
