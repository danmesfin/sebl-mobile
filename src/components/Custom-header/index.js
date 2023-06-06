import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';

const CustomHeader = ({navigation, imageSource}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <Icon name="arrow-back" size={24} color="black" />
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 20,
    borderColor: theme.accent,
    borderRadius: 50,
    borderWidth: 1,
  },
});

export default CustomHeader;
