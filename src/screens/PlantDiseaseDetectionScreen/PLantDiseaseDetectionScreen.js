import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import Tflite from 'tflite-react-native';
import theme from '../../styles/theme';

const tflite = new Tflite();

const PlantDiseaseDetectionScreen = ({route, navigation}) => {
  const [result, setResult] = useState({});
  const {image} = route.params;

  useEffect(() => {
    tflite.loadModel(
      {
        model: 'model.tflite',
        labels: 'labels.txt',
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('load', res);
          tflite.runModelOnImage(
            {
              path: image,
              imageMean: Platform.OS === 'android' ? 128 : 0,
              imageStd: Platform.OS === 'android' ? 128 : 1,
              numResults: 1,
              threshold: 0.05,
            },
            (err, res) => {
              if (err) {
                console.log(err);
              } else {
                console.log('run', res);
                setResult(res[0]);
              }
            },
          );
        }
      },
    );
  }, [image]);

  const handleBackPress = () => {
    navigation.dispatch(StackActions.pop(2));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: image}} style={styles.image} resizeMode="cover" />

        <View style={styles.textContainer}>
          <Text style={styles.prediction}>Prediction: {result.label}</Text>
          <Text style={styles.confidence}>
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  prediction: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
  },
  confidence: {
    marginTop: 10,
    color: theme.textLight,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: theme.secondary,
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: theme.text,
    fontWeight: 'bold',
  },
});

export default PlantDiseaseDetectionScreen;
