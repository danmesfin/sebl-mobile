import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const MAX_CONTENT_LENGTH = 150; // Maximum number of characters to display before truncating

const Card = ({post, navigation}) => {
  const [isContentExpanded, setContentExpanded] = useState(false);

  const truncateContent = content => {
    if (content.length > MAX_CONTENT_LENGTH) {
      return `${content.substring(0, MAX_CONTENT_LENGTH)}...`;
    }
    return content;
  };

  const toggleContentExpanded = () => {
    setContentExpanded(!isContentExpanded);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('view-post', {post})}>
        <Image source={{uri: post.post_image_url}} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{post.title}</Text>
          <Text style={styles.cardText}>
            {isContentExpanded ? post.content : truncateContent(post.content)}
          </Text>
          {post.content.length > MAX_CONTENT_LENGTH && (
            <TouchableOpacity onPress={toggleContentExpanded}>
              <Text style={styles.seeMoreText}>
                {isContentExpanded ? 'See less' : 'See more'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
    color: theme.textPrimary,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.textPrimary,
  },
  cardText: {
    fontSize: 14,
    color: theme.textPrimary,
  },
  seeMoreText: {
    color: 'blue',
    marginTop: 5,
  },
});

export default Card;
