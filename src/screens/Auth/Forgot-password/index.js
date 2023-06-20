import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../../../store/authSlice/actions';
import theme from '../../../styles/theme';

const ForgotPasswordScreen = () => {
  const {isLoading, error, success} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleResetPassword = () => {
    dispatch(resetPassword(email));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        right={<TextInput.Icon icon="account" style={styles.icon} />}
      />

      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={styles.button}
        loading={isLoading}
        disabled={isLoading}>
        Reset Password
      </Button>

      {success && (
        <Text style={styles.success}>
          Password reset email sent. Please check your inbox.
        </Text>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
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
  success: {
    color: 'green',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
