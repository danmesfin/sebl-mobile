// MyCrops.js

import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import theme from '../../styles/theme';

const MyCrops = () => {
  return (
    <View style={styles.container}>
      <View style={styles.myCrops}>
        <Text style={styles.sectionTitle}>My Crops</Text>
        <View style={styles.cropIconsContainer}>
          <TouchableOpacity style={styles.cropIcon} onPress={() => {}}>
            <Image
              source={require('../../../assets/icons/apple.png')}
              style={styles.cropIconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cropIcon} onPress={() => {}}>
            <Image
              source={require('../../../assets/icons/carrot.jpg')}
              style={styles.cropIconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cropIcon} onPress={() => {}}>
            <Image
              source={require('../../../assets/icons/corn.png')}
              style={styles.cropIconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cropIcon} onPress={() => {}}>
            <Image
              source={require('../../../assets/icons/tomato.jpg')}
              style={styles.cropIconImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/*Add two cards here cultivation tips and pest control */}
      <View style={styles.container}>
        <View style={styles.cardRow}>
          <TouchableOpacity style={[styles.card, styles.shadowProp]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: theme.primary,
  },
  section: {
    backgroundColor: theme.secondaryDark,
    padding: 16,
    borderRadius: 10,
    // marginBottom: 16,
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  cardRow: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.secondary,
    marginHorizontal: 4,
    width: '40%',
    aspectRatio: 1.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.PrimaryBorder,
  },
  cardImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  cardTitle: {
    marginTop: 8,
    fontWeight: 'bold',
    color: theme.textPrimary,
    fontSize: 16,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default MyCrops;
