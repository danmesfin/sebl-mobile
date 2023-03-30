import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ImagePickerScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  const selectPicture = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setImageUri(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.previewImage} />
      ) : (
        <Text style={styles.promptText}>Please select an image</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={selectPicture}>
        <Text style={styles.buttonText}>Select Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptText: {
    fontSize: 20,
    color: '#aaa',
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#2a7c6c',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImagePickerScreen;
