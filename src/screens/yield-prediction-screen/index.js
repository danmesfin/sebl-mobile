import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Colors from '../../styles/theme';
import theme from '../../styles/theme';

const cropItems = [
  {name: 'Yams', index: 114},
  {name: 'Wheat', index: 113},
  {name: 'Sweet potato', index: 112},
  {name: 'Soybean', index: 111},
  {name: 'Sorghum', index: 110},
  {name: 'Rice', index: 109},
  {name: 'Potatoes', index: 108},
  {name: 'Plantains and others', index: 107},
  {name: 'Maize', index: 106},
  {name: 'Cassava', index: 105},
];

const PredictionScreen = () => {
  const [crop, setCrop] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pesticideAmount, setPesticideAmount] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState('');

  const handleSubmit = async () => {
    if (!crop || !rainfall || !temperature || !pesticideAmount) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    setLoading(true);

    try {
      const parameters = Array(115).fill(0);
      parameters[0] = 1990;
      parameters[1] = parseFloat(rainfall);
      parameters[2] = parseFloat(temperature);
      parameters[3] = parseFloat(pesticideAmount);
      parameters[4] = 1;

      const cropIndex = cropItems.find(item => item.name === crop)?.index;
      if (cropIndex) {
        parameters[cropIndex] = 1;
      }
      console.log('parameters', parameters.length);
      const response = await axios.post(
        'https://sebl-ai.onrender.com/predict',
        {parameters: parameters},
      );

      const {predicted_yield} = response.data;
      setPredictionResult(predicted_yield);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'Failed to get prediction result. Please try again.',
      );
    }

    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Enter data</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Crop type</Text>
            <View style={styles.selectField}>
              <Picker
                selectedValue={crop}
                onValueChange={value => setCrop(value)}
                style={styles.picker}>
                <Picker.Item label="Select Crop" value="" />
                {cropItems.map(item => (
                  <Picker.Item
                    key={item.name}
                    label={item.name}
                    value={item.name}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Rainfall {'(mm per year)'}</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter rainfall"
              keyboardType="numeric"
              value={rainfall}
              onChangeText={text => setRainfall(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Temperature {' (°C)'}</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter temperature"
              keyboardType="numeric"
              value={temperature}
              onChangeText={text => setTemperature(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Pesticide {'( tones)'}</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter fertilizer amount"
              keyboardType="numeric"
              value={pesticideAmount}
              onChangeText={text => setPesticideAmount(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isLoading}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          {isLoading && (
            <ActivityIndicator size="large" color={Colors.primary} />
          )}
          {predictionResult !== '' && (
            <View style={styles.predictionContainer}>
              <Text style={styles.predictionLabel}>Prediction Result:</Text>
              <Text style={styles.predictionText}>{predictionResult}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    height: 140,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.primaryDark,
    marginBottom: 20,
  },
  headerText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
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
    color: theme.textPrimary,
  },
  inputField: {
    width: 200,
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: theme.textPrimary,
  },
  selectField: {
    width: 200,
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  picker: {
    color: theme.textPrimary,
  },
  submitButton: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: theme.secondary,
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
    color: theme.textPrimary,
  },
  predictionText: {
    color: theme.textPrimary,
  },
});

export default PredictionScreen;
