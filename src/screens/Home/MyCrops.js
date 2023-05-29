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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
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
    top: 20,
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
    elevation: 2,
  },
});

export default MyCrops;
