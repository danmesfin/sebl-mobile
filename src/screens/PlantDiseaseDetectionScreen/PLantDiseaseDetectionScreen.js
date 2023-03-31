import React, {useState, useEffect} from 'react';
import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import Tflite from 'tflite-react-native';

const tflite = new Tflite();

const PlantDiseaseDetectionScreen = ({route, navigation}) => {
  const [result, setResult] = useState({});
  const {image} = route.params;
  console.log('route.params:', route.params);
  console.log('image uri', image);

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

  return (
    <View style={styles.container}>
      {result && result.label ? (
        <View>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
          <Text style={styles.prediction}>Prediction: {result.label}</Text>
          <Text style={styles.confidence}>
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </Text>
        </View>
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  prediction: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  confidence: {
    marginTop: 10,
  },
  loading: {
    textAlign: 'center',
  },
});

export default PlantDiseaseDetectionScreen;
