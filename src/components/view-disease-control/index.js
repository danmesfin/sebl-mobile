import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {firebase} from '../../utils/firebase';
import axios from 'axios';
//import {orange300} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import theme from '../../styles/theme';

const DiseaseControlMethods = ({name, route}) => {
  const [loading, setLoading] = useState(true);
  const [controlMethods, setControlMethods] = useState([]);
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
        <ActivityIndicator size="large" color={theme.accent} />
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
            {method.naturalMethod && <Text>{method.naturalMethod}</Text>}
            {method.chemicalMethod && <Text>{method.chemicalMethod}</Text>}
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>
                Please note that the pesticide recommendations provided are
                general examples and may not be specific to your region or
                current regulations. It's important to consult local
                agricultural extension services or experts for precise and
                up-to-date pesticide recommendations for your area.
                Additionally, always follow the instructions and guidelines
                provided by the pesticide manufacturer and local authorities.
              </Text>
            </View>
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
  warningContainer: {
    marginTop: 20,
    padding: 8,
    backgroundColor: theme.orange,
    elevation: 5,
  },
  warningText: {
    textAlign: 'justify',
    fontSize: 14,
  },
});

export default DiseaseControlMethods;
