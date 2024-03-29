import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import theme from '../../styles/theme';

const categories = [
  {title: 'Crop Selection', category: 'cropSelection', icon: '🌱'},
  {title: 'Soil Preparation', category: 'soilPreparation', icon: '🌱'},
  // {title: 'Seed Sowing', category: 'seedSowing', icon: '🌱'},
  {title: 'irrigation', category: 'irrigation', icon: '🌱'},
  {title: 'Fertilizers', category: 'fertilizers', icon: '🌱'},
  {title: 'Weed Management', category: 'weedManagement', icon: '🌱'},
  {title: 'Harvesting', category: 'harvesting', icon: '🌱'},
];

const CultivationCategorySelectionScreen = ({route, navigation}) => {
  const {cropType} = route.params;

  const handleCategoryPress = (crop, category, title) => {
    navigation.navigate('view-tip-screen', {
      cropType: crop,
      category,
      title,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={styles.card}
          onPress={() =>
            handleCategoryPress(cropType, category.category, category.title)
          }>
          <Text style={styles.icon}>{category.icon}</Text>
          <Text style={styles.title}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.textPrimary,
  },
});

export default CultivationCategorySelectionScreen;
