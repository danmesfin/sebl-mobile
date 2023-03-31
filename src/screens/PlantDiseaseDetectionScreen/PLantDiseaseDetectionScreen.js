import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import Tflite from 'tflite-react-native';

const tflite = new Tflite();

const PlantDiseaseDetectionScreen = ({route, navigation}) => {
  const [result, setResult] = useState({});

  const {image} = route.params;
  console.log('image uri init', image);

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
          console.log('image uri', image);
          tflite.runModelOnImage(
            {
              path: 'file:///data/user/0/com.seblfarmassist/cache/' + image,
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {result && result.label ? (
        <View>
          <Image
            source={{
              uri: 'file:///data/user/0/com.seblfarmassist/cache/' + image,
            }}
            style={{width: 200, height: 200}}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
            Prediction: {result.label}
          </Text>
          <Text style={{marginTop: 10}}>
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default PlantDiseaseDetectionScreen;
