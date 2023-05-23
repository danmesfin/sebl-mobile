import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import theme from '../../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

import {signOutUser} from '../../redux/authSlice/actions';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  // sign out handler
  const signOut = () => {
    dispatch(signOutUser());
  };
  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.infoText}>Account</Text>
        <View style={styles.infoContainer}>
          <Icon style={styles.icon} name="envelope" size={20} />
          <View style={styles.infoList}>
            <Text style={styles.infoText}>Email</Text>
            <Text>johndoe@example.com</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Icon style={styles.icon} name="phone" size={20} />
          <View style={styles.infoList}>
            <Text style={styles.infoText}>Phone</Text>
            <Text>555-1234</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Icon style={styles.icon} name="home" size={20} />
          <View style={styles.infoList}>
            <Text style={styles.infoText}>Address</Text>
            <Text>123 Main St</Text>
          </View>
        </View>
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.infoText}>Settings</Text>
        <View style={styles.infoContainer}>
          <Icon style={styles.icon} name="bell" size={20} />
          <View style={styles.infoList}>
            <Text style={styles.infoText}>Notifications</Text>
            <Text>On</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Icon style={styles.icon} name="language" size={20} />
          <View style={styles.infoList}>
            <Text style={styles.infoText}>Language</Text>
            <Text>English</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Icon style={styles.icon} name="credit-card" size={20} />
          <View style={styles.infoList}>
            <Text style={styles.infoText}>Payment Method</Text>
            <Text>Visa **** **** **** 1234</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.aboutButton}>
        <Text style={styles.aboutButtonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
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
    height: 160,
    paddingTop: 20,
    //paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderWidth: 2,
    backgroundColor: '#000',
    borderColor: theme.PrimaryBorder,
    borderRadius: 50,
    marginRight: 20,
  },
  profileTextContainer: {
    flexDirection: 'column',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  usernameText: {
    fontSize: 16,
    color: '#fff5',
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 2,
    borderRadius: 5,
    paddingTop: 20,
  },
  settingsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 0,
  },
  icon: {
    marginHorizontal: 10,
  },
  infoContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoList: {
    paddingVertical: 5,
  },
  aboutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  aboutButtonText: {
    fontSize: 16,
    color: theme.text,
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 2,
  },
  logoutButtonText: {
    fontSize: 16,
    color: theme.text,
  },
});

export default ProfileScreen;
