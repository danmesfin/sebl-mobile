import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import getFormattedTimeDifference from '../../utils/formattedTimeDifference';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '../../styles/theme';
import axios from 'axios';
import {firebase} from '../../../firebaseConfig';

const user = firebase.auth().currentUser;

const CommentCard = ({comment}) => {
  const [likeCount, setLikeCount] = useState(comment.likes_count);

  const handleUpVote = async () => {
    try {
      // Set the authorization header with the Firebase user token
      const token = await user.getIdToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      console.log('--' + comment.id + '--');
      const response = await axios.post(
        `https://sebl.onrender.com/comments/like/${comment.id}`,
        {},
        {headers}, // Pass headers directly as an argument
      );
      setLikeCount(response.data.likes_count);
    } catch (error) {
      console.log('Error upvoting comment:', error);
    }
  };

  const handleDownVote = async () => {
    try {
      const token = await user.getIdToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `https://sebl.onrender.com/comments/dislike/${comment.id}`,
        {},
        {headers},
      );
      setLikeCount(response.data.likes_count);
    } catch (error) {
      console.log('Error downvoting comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.likesContainer}>
        <TouchableOpacity onPress={handleUpVote} style={styles.voteButton}>
          <Icon name="caretup" size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.likesCount}>{likeCount}</Text>
        <TouchableOpacity onPress={handleDownVote} style={styles.voteButton}>
          <Icon name="caretdown" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.author.name}>{'Daniel Mesfin'}</Text>
        <Text style={styles.date}>
          {getFormattedTimeDifference(comment.created_at)}
        </Text>
        <Text style={styles.content}>{comment.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    //elevation: 1,
  },
  voteButton: {
    marginRight: 10,
    padding: 5,
    color: theme.textPrimary,
  },
  voteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  author: {
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 0,
  },
  content: {
    marginBottom: 5,
    color: theme.textPrimary,
  },
  date: {
    color: '#777',
    marginBottom: 5,
    fontSize: 12,
  },
  likesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 0,
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.textPrimary,
  },
});

export default CommentCard;
