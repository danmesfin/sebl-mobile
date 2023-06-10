// utils/tflite.js

import Tflite from 'tflite-react-native';

const tflite = new Tflite();

// Load the TFLite model
const loadModel = async () => {
  try {
    await tflite.loadModel({
      model: 'yield_prediction_model.tflite',
    });
    console.log('TFLite model loaded successfully');
  } catch (error) {
    console.log('Error loading TFLite model:', error);
  }
};

// Run the TFLite model with input parameters
const runModel = async (soilPh, rainfall, temperature, fertilizerAmount) => {
  const inputs = [
    1990, 1485.0, 121.0, 16.37, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  console.log(inputs.length);
  await loadModel();
  try {
    const outputs = tflite.predict({
      input: inputs,
    });
    console.log('TFLite model ran successfully');
    return outputs; // Modify this based on your model's output format
  } catch (error) {
    console.log('Error running TFLite model:', error);
    return null;
  }
};

export {loadModel, runModel};
