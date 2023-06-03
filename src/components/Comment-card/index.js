import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CommentCard = ({comment}) => {
  const handleUpVote = () => {
    // Handle upvote logic
  };

  const handleDownVote = () => {
    // Handle downvote logic
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleUpVote} style={styles.voteButton}>
        <Text style={styles.voteButtonText}>^</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.author}>{'Daniel Mesfin'}</Text>
        <Text style={styles.content}>{comment.content}</Text>
        <Text style={styles.date}>{comment.created_at._seconds}</Text>
        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={handleDownVote} style={styles.voteButton}>
            <Text style={styles.voteButtonText}>v</Text>
          </TouchableOpacity>
          <Text style={styles.likesCount}>{comment.likes_count}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  voteButton: {
    marginRight: 10,
    padding: 5,
  },
  voteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    marginBottom: 5,
  },
  date: {
    color: '#777',
    marginBottom: 5,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default CommentCard;
