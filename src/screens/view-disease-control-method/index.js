import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {firebase} from '../../../firebaseConfig';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../styles/theme';

const DiseaseControlScreen = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [controlMethods, setControlMethods] = useState(null);
  const {diseaseName} = route.params;

  // Check if the user is authenticated
  const user = firebase.auth().currentUser;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!user) {
        Alert.alert('You need to sign in');
        return;
      }

      const token = await user.getIdToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(
          `https://sebl.onrender.com/disease-control/${diseaseName}`,
          {headers},
        );
        setControlMethods(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [diseaseName, user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{controlMethods.title}</Text>
      <View style={styles.methodContainer}>
        <Text style={styles.methodTitle}>Natural Control Method:</Text>
        <Text style={styles.methodText}>
          {controlMethods.naturalControl.method}
        </Text>
        <Text style={styles.methodText}>
          {controlMethods.naturalControl.description}
        </Text>
      </View>
      <View style={styles.methodContainer}>
        <Text style={styles.methodTitle}>Chemical Control Method:</Text>
        <Text style={styles.methodText}>
          {controlMethods.chemicalControl.method}
        </Text>
        <Text style={styles.methodText}>
          {controlMethods.chemicalControl.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  methodContainer: {
    marginBottom: 10,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color: 'black',
  },
  methodText: {
    textAlign: 'justify',
    color: 'black',
  },
});

export default DiseaseControlScreen;
