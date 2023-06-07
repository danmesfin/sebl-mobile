import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../styles/theme';
import {signOutUser} from '../../store/authSlice/actions';
import {firebase} from '../../../firebaseConfig';
const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  //const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data from API
    const fetchUserProfile = async () => {
      try {
        const token = await firebase.auth().currentUser.getIdToken();
        const response = await axios.get('https://sebl.onrender.com/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data[0]);
        console.log('user', user);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sign out handler
  const signOut = () => {
    dispatch(signOutUser());
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>Please sign in</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {user ? (
        <View>
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../../../assets/icons/apple.png')}
                style={styles.profileImage}
              />
              <View style={styles.profileTextContainer}>
                <Text style={styles.nameText}>{user.name}</Text>
                <Text style={styles.usernameText}>@d123</Text>
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
                <Text>{user.email}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Icon style={styles.icon} name="phone" size={20} />
              <View style={styles.infoList}>
                <Text style={styles.infoText}>Phone</Text>
                <Text>{user.phone}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Icon style={styles.icon} name="home" size={20} />
              <View style={styles.infoList}>
                <Text style={styles.infoText}>Address</Text>
                <Text>{user.address}</Text>
              </View>
            </View>
          </View>
          <View style={styles.settingsContainer}>
            <Text style={styles.infoText}>Settings</Text>
            <View style={styles.infoContainer}>
              <Icon style={styles.icon} name="bell" size={20} />
              <View style={styles.infoList}>
                <Text style={styles.infoText}>Notifications</Text>
                <Text>{user.notifications}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Icon style={styles.icon} name="language" size={20} />
              <View style={styles.infoList}>
                <Text style={styles.infoText}>Language</Text>
                <Text>{user.language}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Icon style={styles.icon} name="credit-card" size={20} />
              <View style={styles.infoList}>
                <Text style={styles.infoText}>Payment Method</Text>
                <Text>{user.paymentMethod}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.signupText}>Please sign up</Text>
      )}
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.secondary,
  },
  header: {
    backgroundColor: theme.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 160,
    paddingTop: 20,
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
    color: theme.secondary,
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
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 0,
  },
  icon: {
    marginHorizontal: 10,
    color: theme.accent,
  },
  infoContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoList: {
    paddingTop: 10,
  },
  aboutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  aboutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginHorizontal: 10,
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
    fontWeight: 'bold',
    color: theme.text,
    marginHorizontal: 10,
  },
  signupText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: theme.text,
  },
});

export default ProfileScreen;
