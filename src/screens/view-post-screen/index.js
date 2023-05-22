import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const PostDetailScreen = ({route}) => {
  const [post, setPost] = useState(route.params);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log('post', post);
  useEffect(() => {
    fetchPostAndComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const submitComment = comment => {
    // Submit the comment to the server
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <View style={styles.postContainer}>
          <Image source={{uri: post.post_image_url}} style={styles.postImage} />
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.postInfoContainer}>
            <Text style={styles.postAuthor}>By {post.author}</Text>
            <Text style={styles.postDate}>
              {new Date(
                post.created_at._seconds * 1000 +
                  post.created_at._nanoseconds / 1000000,
              ).toLocaleString()}
            </Text>
          </View>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      )}
      <View style={styles.commentSection}>
        <TextInput
          placeholder="Write a comment"
          onChangeText={text => setComments(text)}
          onSubmitEditing={() => {
            submitComment(comments);
            setComments('');
          }}
          value={comments}
          style={styles.commentInput}
        />
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
  commentContainer: {
    padding: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
});

export default PostDetailScreen;
