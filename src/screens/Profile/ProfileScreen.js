import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native';
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Image>{/* example user profile image or place holder avator*/}</Image>
        <Text>example user full name</Text>
        <Text>example user eamila</Text>
      </View>
      <Text style={styles.title}>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
