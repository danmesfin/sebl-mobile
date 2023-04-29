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
          <View style={styles.diagnosePlantSection}>
            <Text style={styles.sectionTitle}>Diagnose Plant Diseases</Text>
            <TouchableOpacity
              style={styles.diagnoseButton}
              onPress={() =>
                navigation.navigate('PlantDiseaseNavigator', {
                  screen: 'Select Image',
                })
              }>
              <Text style={styles.diagnoseButtonText}>
                Scan plant leaf to diagnose plant disease
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather</Text>
          <WeatherSection />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultivation Tips</Text>
          <View style={styles.tipContainer}>
            <CultivationTips />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: theme.secondaryDark,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    backgroundColor: theme.secondaryDark,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 16,
  },
  myCrops: {
    backgroundColor: theme.primaryDark,
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
    width: '100%',
  },
  diagnosePlantSection: {
    backgroundColor: theme.secondaryDark,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.PrimaryBorder,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
  },
  cropIconsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  cropIcon: {
    backgroundColor: theme.secondary,
    width: '16%',
    marginHorizontal: 4,
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropIconImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  diagnoseButton: {
    backgroundColor: theme.primaryLight,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  diagnoseButtonText: {
    color: theme.textLight,
    fontSize: 18,
  },
  tipContainer: {
    backgroundColor: theme.primaryLight,
    borderRadius: 10,
    padding: 16,
  },
});

export default HomeScreen;
