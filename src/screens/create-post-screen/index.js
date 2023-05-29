import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import theme from '../../styles/theme';

const ImagePreview = ({imageUri}) => {
  if (imageUri) {
    return <Image source={{uri: imageUri}} style={styles.imagePreview} />;
  } else {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Select Image</Text>
      </View>
    );
  }
};

const CreatePostScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log('imageUri updated:', imageUri);
  }, [imageUri]);

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handlePost = () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please enter both title and description');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageUri) {
      const fileName = imageUri.split('/').pop();
      const fileType = fileName.split('.').pop();
      formData.append('image', {
        uri: imageUri,
        name: `${fileName}.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    axios
      .post('example/createPost', formData)
      .then(response => {
        // handle success response
      })
      .catch(error => {
        // handle error response
      });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleChoosePhoto}>
        <ImagePreview imageUri={imageUri} />
      </TouchableOpacity>

      <TextInput
        style={styles.titleInput}
        placeholder="Title (max 80 characters)"
        maxLength={80}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.descriptionInput}
        placeholder="Short Description (max 250 characters)"
        maxLength={250}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  placeholderContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  postButton: {
    backgroundColor: theme.accent,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreatePostScreen;
