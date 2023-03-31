import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Tflite from 'tflite-react-native';

let tflite = new Tflite();

const PlantDiseaseDetectionScreen = ({route}) => {
  const {imageUri} = route.params;
  const [result, setResult] = useState(null);

  useEffect(() => {
    tflite
      .loadModel(
        {
          model: 'model.tflite',
          labels: 'labels.txt',
        },
        // (err, res) => {
        //   if (err) console.log(err);
        //   else console.log(res);
        // },
      )
      .then(() => {
        tflite.runModelOnImage(
          {
            path: imageUri,
            inputShape: [1, 224, 224, 3],
            inputMean: [0, 0, 0],
            inputStd: [255, 255, 255],
            outputType: 'float32',
          },
          (err, res) => {
            if (err) {
              console.log('error', err);
            } else {
              setResult(res);
            }
          },
        );
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      tflite.unloadModel();
    };
  }, [imageUri]);

  const renderResult = () => {
    if (!result) {
      return <Text style={styles.promptText}>Detecting plant disease...</Text>;
    }
    const {label, confidence} = result[0];
    return (
      <View>
        <Image source={{uri: imageUri}} style={styles.previewImage} />
        <Text style={styles.resultText}>Plant Disease: {label}</Text>
        <Text style={styles.resultText}>
          Confidence: {(confidence * 100).toFixed(2)}%
        </Text>
      </View>
    );
  };

  return <View style={styles.container}>{renderResult()}</View>;
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
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PlantDiseaseDetectionScreen;
