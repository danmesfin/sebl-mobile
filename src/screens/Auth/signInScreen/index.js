import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/auth';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUser(email, password));
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View>
      <Text>Sign In Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Button title="Sign In" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUpNavigation} />
    </View>
  );
};

export default SignInScreen;
