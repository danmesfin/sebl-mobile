import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../android/app/src/main/res/mipmap-xhdpi/ic_launcher.png')}
      />
      <Text style={styles.title}>Sebl</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a7c6c',
  },
});

export default CustomSplashScreen;
