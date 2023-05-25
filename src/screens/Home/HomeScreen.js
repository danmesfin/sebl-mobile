import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import WeatherSection from '../../components/Weather';
import theme from '../../styles/theme';
import MyCrops from './MyCrops';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.scrollViewContent}>
      <MyCrops />
      <View style={styles.topContainer}>
        {/*Add two cards here cultivation tips and pest control */}
        <View style={styles.container}>
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={[styles.card]}
              onPress={() => navigation.navigate('select-crop')}>
              <Image
                source={require('../../../assets/icons/cultivation-tips.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Cultivation Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Image
                source={require('../../../assets/icons/pest-control.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Pest Control</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.diagnoseSection}>
        <View style={styles.diagnoseContainer}>
          <Text style={styles.sectionTitle}>Plant Health</Text>
          <TouchableOpacity
            style={styles.diagnoseButton}
            onPress={() =>
              navigation.navigate('PlantDiseaseNavigator', {
                screen: 'Select Image',
              })
            }>
            <Text style={styles.diagnoseButtonText}>
              Diagnose plant diseases --{'>'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('view-disease-control-methods', {
              diseaseName: 'Wheat Rust',
            })
          }>
          <Text>see control method</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather</Text>
          <WeatherSection />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: theme.primaryDark,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    color: '#fff',
    marginBottom: 16,
  },
  myCrops: {
    backgroundColor: theme.primaryDark,
    padding: 16,
    height: 160,
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
  cardRow: {
    position: 'relative',
    top: -40,
    marginTop: 0,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.secondary,
    marginHorizontal: 4,
    width: '50%',
    aspectRatio: 1.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 0.1,
    //borderColor: theme.PrimaryBorder,
    elevation: 10,
  },
  cardImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  cardTitle: {
    marginTop: 8,
    fontWeight: 'bold',
    color: theme.orange,
    fontSize: 16,
  },
  diagnoseSection: {
    backgroundColor: '#fff',
    // paddingVertical: 20,
    paddingLeft: 20,
  },
  diagnoseContainer: {
    backgroundColor: theme.primaryLight,
    padding: 10,
    paddingLeft: 26,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginBottom: 16,
    elevation: 5,
  },
  diagnoseButton: {
    backgroundColor: '#A4BE7B',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  diagnoseButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
