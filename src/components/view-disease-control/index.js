import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {firebase} from '../../utils/firebase';
import axios from 'axios';

const DiseaseControlMethods = ({name}) => {
  const [loading, setLoading] = useState(true);
  const [controlMethods, setControlMethods] = useState([]);
  const {diseaseName} = 'Wheat Rust';

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
        console.log('response', response);
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
      <Text style={styles.title}>{diseaseName}</Text>
      {controlMethods.length > 0 ? (
        controlMethods.map((method, index) => (
          <View key={index} style={styles.methodContainer}>
            <Text style={styles.methodTitle}>{method.title}</Text>
            <Text>{method.naturalMethod}</Text>
            <Text>{method.chemicalMethod}</Text>
          </View>
        ))
      ) : (
        <Text>No control methods available for this disease.</Text>
      )}
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

export default DiseaseControlMethods;
