import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  VirtualizedList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import getFormattedTimeDifference from '../../utils/formattedTimeDifference';
import {firebase} from '../../../firebaseConfig';
import axios from 'axios';
import CommentCard from '../../components/Comment-card';
import theme from '../../styles/theme';

const PostDetailScreen = ({route}) => {
  const [post, setPost] = useState(route.params.post);
  const [comments, setComments] = useState();
  const [commentInput, setCommentInput] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is authenticated
  const user = firebase.auth().currentUser;

  useEffect(() => {
    fetchPostAndComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const fetchPostAndComments = async () => {
    const token = await user.getIdToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const commentsResponse = await axios.get(
        `https://sebl.onrender.com/comments/post/${post.id}`,
        {headers},
      );
      const commentsData = commentsResponse.data;

      setComments(commentsData);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const renderComments = ({item}) => {
    return <CommentCard comment={item} />;
  };

  const submitComment = async comment => {
    const newComment = {
      post_id: post.id,
      content: comment,
    };
    const token = await user.getIdToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        'https://sebl.onrender.com/comments/',
        newComment,
        {
          headers,
        },
      );
      // Update the comments state with the new comment received from the server
      setComments([...comments, response.data]);
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={theme.accent}
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.postContainer}>
          <Image source={{uri: post.post_image_url}} style={styles.postImage} />
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.postInfoContainer}>
            <Text style={styles.postAuthor}>By {post.author.name}</Text>
            <Text style={styles.postDate}>
              {getFormattedTimeDifference(post.created_at)}
            </Text>
          </View>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      )}
      <View style={styles.addComment}>
        <TextInput
          placeholder="Write a comment"
          onChangeText={text => setCommentInput(text)}
          value={commentInput}
          style={styles.commentInput}
        />
        <TouchableOpacity
          onPress={() => {
            submitComment(commentInput);
            setCommentInput('');
          }}
          style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentSection}>
        <Text style={styles.commentsText}>Comments</Text>
        {comments ? (
          <VirtualizedList
            data={comments}
            initialNumToRender={10}
            renderItem={renderComments}
            keyExtractor={item => item.id}
            getItemCount={() => comments.length}
            getItem={(data, index) => data[index]}
          />
        ) : (
          ''
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    color: theme.textPrimary,
  },
  postInfoContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  postAuthor: {
    marginRight: 10,
    color: theme.textPrimary,
  },
  postDate: {},
  postContent: {
    marginTop: 10,
    color: theme.textPrimary,
  },

  commentSection: {
    padding: 10,
    borderTopWidth: 0.2,
    borderTopColor: theme.borderColor,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 4,
    color: theme.textPrimary,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    color: theme.textPrimary,
  },
  postButton: {
    backgroundColor: theme.accent,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentsText: {
    marginLeft: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.accent,
  },
  commentContainer: {
    padding: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PostDetailScreen;
