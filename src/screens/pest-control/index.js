import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../styles/theme';
import {runModel} from '../../utils/yieldPrediction'; // Import your TFLite model running function

const PredictionScreen = () => {
  const [soilPh, setSoilPh] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [fertilizerAmount, setFertilizerAmount] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState('');

  const handleSubmit = () => {
    if (!soilPh || !rainfall || !temperature || !fertilizerAmount) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    setLoading(true);
    // Run your TFLite model with the input parameters
    const result = runModel(soilPh, rainfall, temperature, fertilizerAmount);
    setLoading(false);
    setPredictionResult(result);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Soil pH</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter soil pH"
            keyboardType="numeric"
            value={soilPh}
            onChangeText={text => setSoilPh(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Rainfall</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter rainfall"
            keyboardType="numeric"
            value={rainfall}
            onChangeText={text => setRainfall(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Temperature</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter temperature"
            keyboardType="numeric"
            value={temperature}
            onChangeText={text => setTemperature(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Fertilizer Amount</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter fertilizer amount"
            keyboardType="numeric"
            value={fertilizerAmount}
            onChangeText={text => setFertilizerAmount(text)}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color={Colors.primary} />}
        {predictionResult !== '' && (
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionLabel}>Prediction Result:</Text>
            <Text style={styles.predictionText}>{predictionResult}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.textLight,
  },
  inputField: {
    width: 200,
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: Colors.textDark,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  predictionContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  predictionLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.textDark,
  },
  predictionText: {
    color: Colors.textDark,
  },
});

export default PredictionScreen;
