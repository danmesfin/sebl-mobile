import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import {signUpUser} from '../../../store/authSlice/actions';
import Colors from '../../../styles/theme';
import theme from '../../../styles/theme';

const SignUpScreen = ({navigation}) => {
  const {isLoading} = useSelector(state => state.auth);
  const {error} = useSelector(state => state.auth);
  const [name, setName] = useState('Daniel Mesfin');
  const [email, setEmail] = useState('danielmsfn@gmail.com');
  const [password, setPassword] = useState('1234567890');
  const [confirmPassword, setConfirmPassword] = useState('1234567890');

  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    dispatch(signUpUser(email, password, name));
  };

  const handleSignInNavigation = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      {error ? <Text style={styles.errorMessage}>{error}</Text> : ''}
      <TextInput
        style={styles.input}
        label="Name"
        value={name}
        onChangeText={value => setName(value)}
        right={<TextInput.Icon style={styles.icon} icon="account" />}
      />

      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
        autoCapitalize="none"
        right={<TextInput.Icon style={styles.icon} icon="email" />}
      />
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
        right={<TextInput.Icon style={styles.icon} icon="lock" />}
      />
      <TextInput
        style={styles.input}
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={value => setConfirmPassword(value)}
        secureTextEntry={true}
        right={<TextInput.Icon style={styles.icon} icon="lock" />}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSignUp}
        disabled={isLoading}>
        {isLoading ? <ActivityIndicator size={'small'} /> : ''} Sign Up
      </Button>
      <TouchableOpacity onPress={handleSignInNavigation}>
        <Text style={styles.signInText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.accent,
    borderRadius: 10,
    padding: 0,
    color: theme.textPrimary,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: 20,
    backgroundColor: Colors.accent,
  },
  icon: {
    marginRight: 10,
    color: theme.accent,
    opacity: 0.6,
  },
  signInText: {
    marginTop: 20,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: theme.orange,
  },
});

export default SignUpScreen;
