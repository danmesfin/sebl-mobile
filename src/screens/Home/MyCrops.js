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
        {/*Add two cards here cultivation tips and pest control */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
});

export default MyCrops;
