// utils/tflite.js

import {Tflite} from 'tflite-react-native';

const tflite = new Tflite();

// Load the TFLite model
const loadModel = async () => {
  try {
    await tflite.loadModel({
      model: 'path/to/your/model.tflite',
    });
    console.log('TFLite model loaded successfully');
  } catch (error) {
    console.log('Error loading TFLite model:', error);
  }
};

// Run the TFLite model with input parameters
const runModel = (soilPh, rainfall, temperature, fertilizerAmount) => {
  const inputs = [soilPh, rainfall, temperature, fertilizerAmount];
  try {
    const outputs = tflite.runModelOnBinary({
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
