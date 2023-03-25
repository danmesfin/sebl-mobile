import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../styles/theme';

const mockPosts = [
  {
    id: 1,
    image: 'https://picsum.photos/id/237/200/300',
    postedBy: 'John Doe',
    date: 'March 22, 2023',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/238/200/300',
    postedBy: 'Jane Doe',
    date: 'March 23, 2023',
  },
];

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {mockPosts.map(post => (
          <View style={styles.postCard} key={post.id}>
            <Image source={{uri: post.image}} style={styles.postImage} />
            <View style={styles.postInfo}>
              <Text style={styles.postedBy}>{post.postedBy}</Text>
              <Text style={styles.date}>{post.date}</Text>
            </View>
            <View style={styles.commentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor={Colors.textLight}
              />
              <TouchableOpacity style={styles.commentButton}>
                <Text style={styles.commentButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.askQuestionContainer}>
        <TextInput
          style={styles.askQuestionInput}
          placeholder="Ask a question..."
          placeholderTextColor={Colors.textLight}
        />
        <TouchableOpacity style={styles.attachImageIcon}>
          <Text style={styles.attachImageText}>Attach Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContainer: {
    padding: 16,
  },
  postCard: {
    borderRadius: 10,
    backgroundColor: Colors.secondaryDark,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  postedBy: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  date: {
    color: Colors.textLight,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: Colors.secondary,
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  commentButton: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 20,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  askQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  askQuestionInput: {
    flex: 1,
    backgroundColor: Colors.secondaryDark,
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  attachImageIcon: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  attachImageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommunityScreen;
