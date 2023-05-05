import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import WeatherSection from '../../components/Weather';
import CultivationTips from '../../components/Cultivation';
import theme from '../../styles/theme';
import MyCrops from './MyCrops';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.scrollViewContent}>
      <View style={styles.container}>
        <MyCrops />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plant Health</Text>
          <TouchableOpacity
            style={styles.diagnoseButton}
            onPress={() =>
              navigation.navigate('PlantDiseaseNavigator', {
                screen: 'Select Image',
              })
            }>
            <Text style={styles.diagnoseButtonText}>
              Diagnose plant diseases
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather</Text>
          <WeatherSection />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultivation Tips</Text>
          <CultivationTips />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.background,
  },
  section: {
    backgroundColor: theme.surface,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 16,
  },
  diagnoseButton: {
    backgroundColor: theme.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  diagnoseButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
