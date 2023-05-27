import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import WeatherSection from '../../components/Weather';
import theme from '../../styles/theme';
import MyCrops from './MyCrops';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.scrollViewContent}>
      <ImageBackground
        source={require('../../../assets/bg-2.jpg')}
        resizeMode="cover"
        style={styles.image}>
        {/* <MyCrops /> */}
        <View style={styles.section}>
          <WeatherSection />
        </View>

        <View style={styles.topContainer}>
          {/*Add two cards here cultivation tips and pest control */}

          <View style={styles.container}>
            <View style={styles.cardRow}>
              <TouchableOpacity
                style={[styles.card]}
                onPress={() => navigation.navigate('select-crop')}>
                <Image
                  source={require('../../../assets/icons/cultivation-tip.png')}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>Cultivation Tips</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('PlantDiseaseNavigator', {
                    screen: 'Select Image',
                  })
                }>
                <Image
                  source={require('../../../assets/icons/pest-controll.png')}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>Pest Control</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('PlantDiseaseNavigator', {
                    screen: 'Select Image',
                  })
                }>
                <Image
                  source={require('../../../assets/diagnose-plant.jpg')}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>Diagnose Plant</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('yield-prediction')}>
                <Image
                  source={require('../../../assets/yield-prediction.png')}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>Yield Prediction</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={styles.diagnoseSection}>
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
        </View> */}
      </ImageBackground>
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
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0.5,
    elevation: 0.5,
  },
  section: {
    // backgroundColor: theme.surface,

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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.secondary,
    marginHorizontal: 4,
    width: '47%',
    height: 130,
    marginTop: 10,
    //aspectRatio: 1.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.9,
    borderColor: theme.primaryDark,
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
    color: theme.primaryDark,
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
  weatherContainer: {
    elevation: 5,
  },
});

export default HomeScreen;
