import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser} from '../../../redux/authSlice';
import Colors from '../../../styles/theme';

const SignUpScreen = ({navigation}) => {
  const {isLoading} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfPassword] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(signUpUser(email, password));
  };

  const handleSignInNavigation = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={value => setConfPassword(value)}
        secureTextEntry={true}
      />
      <Button
        mode="contained"
        style={styles.button}
        title="Sign Up"
        onPress={handleSignUp}
        disabled={isLoading}>
        Sign Up
      </Button>
      <View style={styles.footer}>
        <Text style={styles.orText}>OR</Text>
        <Button
          mode="contained"
          style={styles.button}
          title="Sign In"
          onPress={handleSignInNavigation}>
          Sign In
        </Button>
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    marginTop: 20,
    backgroundColor: Colors.accent,
  },
  orText: {
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default SignUpScreen;
