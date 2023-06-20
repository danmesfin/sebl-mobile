import {View, Text, Image, StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const ImagePreview = ({imageUri}) => {
  if (imageUri) {
    return <Image source={{uri: imageUri}} style={styles.imagePreview} />;
  } else {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Select Image</Text>
        <Image
          source={require('../../../assets/icons/attach-image.png')}
          style={styles.icon}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  placeholderContainer: {
    width: '100%',
    height: 300,
    backgroundColor: theme.accent,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
});

export default ImagePreview;
