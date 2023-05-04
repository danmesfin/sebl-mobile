import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../../assets/icons/apple.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.nameText}>John Doe</Text>
            <Text style={styles.usernameText}>@johndoe</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Image source={''} style={styles.editButtonIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.infoText}>Email: johndoe@example.com</Text>
        <Text style={styles.infoText}>Phone: 555-1234</Text>
        <Text style={styles.infoText}>Address: 123 Main St</Text>
      </View>
      <TouchableOpacity style={styles.aboutButton}>
        <Text style={styles.aboutButtonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.secondary,
    //paddingHorizontal: 20,
    //paddingTop: 20,
  },
  header: {
    backgroundColor: theme.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '33%',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileTextContainer: {
    flexDirection: 'column',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  usernameText: {
    fontSize: 16,
    color: theme.text,
  },
  editButton: {
    backgroundColor: theme.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  profileInfo: {
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: theme.text,
    marginBottom: 10,
  },
  aboutButton: {
    //backgroundColor: theme.primaryLight,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  aboutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textLight,
  },
  logoutButton: {
    //backgroundColor: theme.primaryDark,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textLight,
  },
});

export default ProfileScreen;
