import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {firebase} from '../../../firebaseConfig';
import theme from '../../styles/theme';
import ImagePreview from '../../components/Image-preview';

const CreatePostScreen = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const uploadImage = async () => {
    setUploading(true);
    setUploadProgress(0);
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const storageRef = firebase.storage().ref().child(`images/${fileName}`);
      const uploadTask = storageRef.put(blob);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        error => {
          console.log('Error uploading image:', error);
          setUploadProgress(0);
          setUploading(false);
        },
        () => {
          setUploadProgress(100);
          setUploading(false);
        },
      );

      await uploadTask;

      const downloadURL = await storageRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handlePost = async () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'Please sign in to post.');
      return;
    }
    if (!title || !content) {
      Alert.alert('Error', 'Please enter both title and description');
      return;
    }

    try {
      let downloadURL = '';
      if (imageUri) {
        downloadURL = await uploadImage();
        if (!downloadURL) {
          Alert.alert('Error', 'Failed to upload image. Please try again.');
          return;
        }
      }

      const post = {
        title,
        content,
        post_image_url: downloadURL,
      };

      const token = await user.getIdToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post('https://sebl.onrender.com/posts/', post, {headers});
      Alert.alert('POSTED SUCCESFULLY');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to post. Please try again.');
    }
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
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity
        style={styles.postButton}
        onPress={handlePost}
        disabled={uploading}>
        {uploading ? (
          <ActivityIndicator size="small" color={theme.textPrimary} />
        ) : (
          <Text style={styles.postButtonText}>Post</Text>
        )}
      </TouchableOpacity>

      {uploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="small" color={theme.textPrimary} />
          {uploadProgress > 0 && (
            <Text style={styles.uploadingText}>{`${Math.round(
              uploadProgress,
            )}%`}</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  selectImageText: {
    color: theme.textPrimary,
  },
  titleInput: {
    color: theme.textPrimary,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  descriptionInput: {
    color: theme.textPrimary,
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
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadingText: {
    color: theme.textPrimary,
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CreatePostScreen;
