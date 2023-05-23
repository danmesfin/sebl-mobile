import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';

const DiseaseControlScreen = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [controlMethods, setControlMethods] = useState([]);
  const {diseaseName} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sebl.onrender.com/disease-control/disease-control/${diseaseName}`,
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
  }, [diseaseName]);

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
            <Text>{method.description}</Text>
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

export default DiseaseControlScreen;
