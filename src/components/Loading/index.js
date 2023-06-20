import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const Loading = () => {
  return (
    <ActivityIndicator
      color={MD2Colors.green600}
      style={styles.loadingIndicator}
    />
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 100,
    // color: theme.accent,
  },
});

export default Loading;
