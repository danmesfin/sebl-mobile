import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const CultivationTips = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cultivation Tips</Text>
      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>Tip 1: Soil Preparation</Text>
        <Text style={styles.tipText}>
          Before planting, make sure to prepare the soil by removing weeds,
          breaking up any large clumps, and adding organic matter such as
          compost or manure.
        </Text>
      </View>
      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>Tip 2: Proper Watering</Text>
        <Text style={styles.tipText}>
          Water your plants deeply but infrequently to encourage deep root
          growth. Avoid getting water on the leaves as this can lead to fungal
          diseases.
        </Text>
      </View>
      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>Tip 3: Fertilizing</Text>
        <Text style={styles.tipText}>
          Use a balanced fertilizer to provide your plants with the nutrients
          they need. Be careful not to over-fertilize as this can lead to
          nutrient burn.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 10,
  },
  tipContainer: {
    marginVertical: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.secondary,
    marginBottom: 5,
  },
  tipText: {
    fontSize: 16,
    color: theme.text,
  },
});

export default CultivationTips;
