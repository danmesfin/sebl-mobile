import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import {firebase} from '../../../firebaseConfig';
import Colors from '../../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../components/post-card';
import theme from '../../styles/theme';
import {useSelector} from 'react-redux';

const crops = [
  'Tomatoes',
  'Potatoes',
  'Peppers',
  'Corn',
  'Wheat',
  'Soybeans',
  'Cotton',
  'Rice',
];

const CommunityScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // Check if the user is authenticated
  const user = firebase.auth().currentUser;
  // const user = useSelector(state => state.auth.user);

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      if (!user) {
        Alert.alert('please sign in first!');
      }
      const token = await user.getIdToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.get('https://sebl.onrender.com/posts', {
          headers: headers,
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color={Colors.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={Colors.textLight}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {crops.map(crop => (
            <TouchableOpacity style={styles.cropButton} key={crop}>
              <Text style={styles.cropButtonText}>{crop}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.isLoading}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Card post={item} navigation={navigation} />}
        />
      )}
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.map(post => (
          <View style={styles.postCard} key={post.id}>
            <TouchableOpacity style={styles.postImageContainer}>
              <Image
                source={{uri: post.post_image_url}}
                style={styles.postImage}
              />
            </TouchableOpacity>
            <View>
              <Text>{post.title}</Text>
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.postedBy}>{post.author}</Text>
              <Text style={styles.date}>{post.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView> */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('create-post', {
            screen: 'create-post',
          })
        }
        style={styles.floatingButton}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: Colors.textLight,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterTitle: {
    fontWeight: 'bold',
    marginRight: 8,
    color: Colors.textLight,
  },
  cropButton: {
    backgroundColor: Colors.secondaryDark,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropButtonText: {
    color: Colors.textLight,
    //fontWeight: 'bold',
  },

  isLoading: {
    marginTop: 120,
  },
  scrollContainer: {
    padding: 16,
  },
  postCard: {
    backgroundColor: Colors.secondaryLight,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    color: theme.textPrimary,
  },
  postedBy: {
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
  date: {
    color: theme.textLight,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  commentInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: theme.textPrimary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: Colors.textLight,
  },
  commentButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityScreen;
