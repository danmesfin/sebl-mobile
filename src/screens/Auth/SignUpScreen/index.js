import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../../../redux/authSlice';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(signUpUser(email, password));
  };

  const handleSignInNavigation = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View>
      <Text>Sign Up Screen</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign In" onPress={handleSignInNavigation} />
    </View>
  );
};

export default SignUpScreen;
