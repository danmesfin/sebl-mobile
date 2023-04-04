import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../styles/theme';
// Mock data tips by crop category
const tipsByCrop = {
  tomato: [
    {
      id: 1,
      title: 'Watering tips',
      description:
        'Tomatoes need regular watering, but don’t overwater them as this can lead to root rot.',
    },
    {
      id: 2,
      title: 'Fertilizing tips',
      description:
        'Tomatoes need a lot of nutrients, so use a balanced fertilizer every two weeks.',
    },
    {
      id: 3,
      title: 'Pest control tips',
      description:
        'Watch out for aphids, spider mites, and whiteflies. Use insecticidal soap to get rid of them.',
    },
  ],
  cucumber: [
    {
      id: 1,
      title: 'Watering tips',
      description:
        'Cucumbers need regular watering, but don’t overwater them as this can lead to root rot.',
    },
    {
      id: 2,
      title: 'Fertilizing tips',
      description:
        'Cucumbers need a lot of nutrients, so use a balanced fertilizer every two weeks.',
    },
    {
      id: 3,
      title: 'Pest control tips',
      description:
        'Watch out for cucumber beetles, aphids, and spider mites. Use insecticidal soap to get rid of them.',
    },
  ],
};

// Cultivation tip item component
const CultivationTipItem = ({title, description}) => (
  <View style={styles.tipContainer}>
    <Text style={styles.tipTitle}>{title}</Text>
    <Text style={styles.tipItemDescription}>{description}</Text>
  </View>
);

// Cultivation tips section component
const CultivationTipsSection = ({crop}) => {
  const tips = tipsByCrop[crop];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cultivation Tips</Text>
      {tips.map(tip => (
        <CultivationTipItem
          key={tip.id}
          title={tip.title}
          description={tip.description}
        />
      ))}
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

export default CultivationTipsSection;
