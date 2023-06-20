import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {firebase} from '../../utils/firebase';
import axios from 'axios';
import {Card} from 'react-native-paper';
import theme from '../../styles/theme';

const DiseaseControlMethods = ({name, route}) => {
  const [loading, setLoading] = useState(true);
  const [controlMethods, setControlMethods] = useState({});
  const diseaseName = name;

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
        <ActivityIndicator size="large" color={theme.accent} />
      </View>
    );
  }

  if (!controlMethods || Object.keys(controlMethods).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Control methods data not available right now. We will add them soon.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{diseaseName}</Text>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.sectionContent}>
          {controlMethods.additionalInfo?.introduction}
        </Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Symptoms</Text>
        <Text style={styles.sectionContent}>
          {controlMethods.additionalInfo?.symptoms}
        </Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Biology</Text>
        <Text style={styles.sectionContent}>
          {controlMethods.additionalInfo?.biology}
        </Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Control Methods</Text>
        <Text style={styles.methodTitle}>
          {controlMethods.controlMethods.naturalControl?.method}
        </Text>
        <Text style={styles.sectionContent}>
          {controlMethods.controlMethods.naturalControl?.description}
        </Text>
        <Text style={styles.methodTitle}>
          {controlMethods.controlMethods.chemicalControl?.method}
        </Text>
        <Text style={styles.sectionContent}>
          {controlMethods.chemicalControl?.description}
        </Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Pesticide Recommendations</Text>
        {controlMethods.pesticideRecommendations?.map(
          (recommendation, index) => (
            <View key={index}>
              <Text style={styles.methodTitle}>{recommendation.pesticide}</Text>
              <Text style={styles.sectionContent}>
                Dosage: {recommendation.dosage}
              </Text>
              <Text style={styles.sectionContent}>
                Application Timing: {recommendation.applicationTiming}
              </Text>
              <Text style={styles.sectionContent}>
                Preharvest Interval: {recommendation.preharvestInterval}
              </Text>
              <Text style={styles.sectionContent}>
                Reentry Interval: {recommendation.reentryInterval}
              </Text>
            </View>
          ),
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Monitoring and Management</Text>
        <Text style={styles.sectionContent}>
          {controlMethods.additionalInfo?.monitoringAndManagement}
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.textPrimary,
  },
  card: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.textPrimary,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: theme.textPrimary,
  },
  sectionContent: {
    color: theme.textPrimary,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
});

export default DiseaseControlMethods;
