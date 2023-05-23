import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import getFormattedTimeDifference from '../../utils/formattedTimeDifference';

const PostDetailScreen = ({route}) => {
  const [post, setPost] = useState(route.params.post);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPostAndComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const fetchPostAndComments = async () => {
    try {
      // const postResponse = await fetch(
      //   `https://sebl.onrender.com/posts/${post.id}`,
      // );
      // const postData = await postResponse.json();
      // setPost(postData);

      const commentsResponse = await fetch(
        `https://sebl.onrender.com/comments/post/${post.id}`,
      );
      const commentsData = await commentsResponse.json();
      setComments(commentsData);

      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const renderComment = ({item}) => {
    return (
      <View style={styles.commentContainer}>
        <Text style={styles.commentAuthor}>{item.author}</Text>
        <Text>{item.content}</Text>
      </View>
    );
  };

  const submitComment = async comment => {
    try {
      const response = await fetch('https://sebl.onrender.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: post.id,
          content: comment,
        }),
      });
      const responseData = await response.json();
      // Update the comments state with the new comment received from the server
      setComments([...comments, responseData]);
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <View style={styles.postContainer}>
          <Image source={{uri: post.post_image_url}} style={styles.postImage} />
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.postInfoContainer}>
            <Text style={styles.postAuthor}>By {post.author}</Text>
            <Text style={styles.postDate}>
              {getFormattedTimeDifference(post.created_at)}
            </Text>
          </View>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      )}
      <View style={styles.commentSection}>
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
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
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
  },
  postInfoContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  postAuthor: {
    marginRight: 10,
  },
  postDate: {},
  postContent: {
    marginTop: 10,
  },
  commentSection: {
    padding: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#0084ff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentContainer: {
    padding: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
});

export default PostDetailScreen;
