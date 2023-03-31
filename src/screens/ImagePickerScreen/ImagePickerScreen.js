import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePickerScreen = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);

  const handleSelectPicture = async launchType => {
    if (launchType === 'library') {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 800,
        maxWidth: 800,
        quality: 1,
      };
      launchImageLibrary(options, response => {
        if (response.assets) {
          setImageUri(response.assets[0].fileName);
          navigation.navigate('Plant Disease Detection', {image: imageUri});
        }
      });
    } else if (launchType === 'camera') {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 800,
        maxWidth: 800,
      };

      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorMessage) {
          console.log('Camera Error: ', response.errorMessage);
          console.log('Error code: ', response.errorCode);
        } else if (response.assets) {
          setImageUri(response.assets[0].fileName);
          navigation.navigate('PlantDiseaseNavigator', {
            screen: 'Plant Disease Detection',
            params: {image: imageUri},
          });
        } else {
          console.log('Unkonwn error');
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image
          source={{
            uri: 'file:///data/user/0/com.seblfarmassist/cache/' + imageUri,
          }}
          style={styles.previewImage}
        />
      ) : (
        <Text style={styles.promptText}>Please select an image</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelectPicture('library')}>
          <Text style={styles.buttonText}>Choose from Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSelectPicture('camera')}>
          <Text style={styles.buttonText}>Take a Picture</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2a7c6c',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImagePickerScreen;
