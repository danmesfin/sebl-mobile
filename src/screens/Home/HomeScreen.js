import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.ScrollViewContent}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Crops</Text>
          <View style={styles.cropIconsContainer}>
            <TouchableOpacity style={styles.cropIcon} onPress={() => {}}>
              {/* Insert crop icon here */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cropIcon} onPress={() => {}}>
              {/* Insert crop icon here */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cropIcon} onPress={() => {}}>
              {/* Insert crop icon here */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cropIcon} onPress={() => {}}>
              {/* Insert crop icon here */}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnose Crop</Text>
          <TouchableOpacity
            style={styles.diagnoseButton}
            onPress={() => navigation.navigate('ScanPlantLeaf')}>
            <Text style={styles.diagnoseButtonText}>
              Scan plant leaf to diagnose plant disease
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultivation Tips</Text>
          {/* Insert cultivation tips here */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cropIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cropIcon: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    height: 80,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  diagnoseButton: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagnoseButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default HomeScreen;
