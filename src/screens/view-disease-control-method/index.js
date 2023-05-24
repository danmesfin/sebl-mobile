import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {firebase} from '../../../firebaseConfig';
import axios from 'axios';

const DiseaseControlScreen = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [controlMethods, setControlMethods] = useState(null);
  const {diseaseName} = route.params;

  // Check if the user is authenticated
  const user = firebase.auth().currentUser;

  useEffect(() => {
    const fetchData = async () => {
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
        <Text>{controlMethods.naturalControl.method}</Text>
        <Text>{controlMethods.naturalControl.description}</Text>
      </View>
      <View style={styles.methodContainer}>
        <Text style={styles.methodTitle}>Chemical Control Method:</Text>
        <Text>{controlMethods.chemicalControl.method}</Text>
        <Text>{controlMethods.chemicalControl.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  methodContainer: {
    marginBottom: 10,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default DiseaseControlScreen;
