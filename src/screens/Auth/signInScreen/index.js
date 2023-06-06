import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../store/authSlice/actions';
import theme from '../../../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignInScreen = ({navigation}) => {
  const {isLoading, error} = useSelector(state => state.auth);
  const [email, setEmail] = useState('danielmsfn@gmail.com');
  const [password, setPassword] = useState('1234567890');

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUser(email, password));
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp');
  };

  const handleFirebaseErrors = errorMessage => {
    switch (errorMessage.code) {
      case 'auth/user-not-found':
        return 'User not found. Please check your email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address. Please check and try again.';
      default:
        return 'An unknown error occurred. Please try again later.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        right={<TextInput.Icon icon="account" style={styles.icon} />}
      />

      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
        right={<TextInput.Icon icon="lock" style={styles.icon} />}
      />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={isLoading}
          disabled={isLoading}>
          Sign In
        </Button>
      )}
      {error && <Text style={styles.error}>{handleFirebaseErrors(error)}</Text>}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUpNavigation}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  icon: {
    marginRight: 10,
    color: theme.accent,
    opacity: 0.6,
  },
  button: {
    width: '100%',
    marginTop: 20,
    backgroundColor: theme.accent,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    margin: 0,
    color: theme.textPrimary,
  },
  footerLink: {
    color: theme.accent,
    paddingHorizontal: 2,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignInScreen;
