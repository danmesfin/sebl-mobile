import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, FlatList} from 'react-native';

const PostDetailScreen = ({route}) => {
  const [post, setPost] = route.params;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the post and comments from the server using the route params
  }, []);

  const renderComment = ({item}) => {
    return (
      <View style={{padding: 10}}>
        <Text style={{fontWeight: 'bold'}}>{item.author}</Text>
        <Text>{item.content}</Text>
      </View>
    );
  };

  const submitComment = comment => {
    // Submit the comment to the server
  };

  return (
    <View style={{flex: 1}}>
      {post ? (
        <View style={{padding: 10}}>
          <Image
            source={{uri: post.post_image_url}}
            style={{width: '100%', height: 200}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 18, marginTop: 10}}>
            {post.title}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{marginRight: 10}}>By {post.author}</Text>
            <Text>{post.created_at}</Text>
          </View>
          <Text style={{marginTop: 10}}>{post.content}</Text>
        </View>
      ) : (
        <View style={{padding: 10}}>
          <View style={{height: 200, backgroundColor: '#f2f2f2'}} />
          <View style={{marginTop: 10, marginBottom: 5}}>
            <View
              style={{height: 20, width: 100, backgroundColor: '#f2f2f2'}}
            />
            <View
              style={{
                height: 20,
                width: 100,
                backgroundColor: '#f2f2f2',
                marginTop: 5,
              }}
            />
          </View>
          <View style={{height: 150, backgroundColor: '#f2f2f2'}} />
        </View>
      )}
      <View style={{padding: 10}}>
        <TextInput
          placeholder="Write a comment"
          onChangeText={text => setComments(text)}
          onSubmitEditing={() => {
            submitComment(comments);
            setComments('');
          }}
          value={comments}
          style={{
            borderWidth: 1,
            borderColor: '#f2f2f2',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          }}
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

export default PostDetailScreen;
