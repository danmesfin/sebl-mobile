import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

const categories = [
  {id: 'cropSelection', title: 'Crop Selection', icon: '🌱'},
  {id: 'soilPreparation', title: 'Soil Preparation', icon: '🌱'},
  {id: 'seedSelection', title: 'Seed Selection', icon: '🌱'},
  {id: 'seedSowing', title: 'Seed Sowing', icon: '🌱'},
  {id: 'irrigation', title: 'Irrigation', icon: '🌱'},
  {id: 'fertilizers', title: 'Fertilizers', icon: '🌱'},
  {id: 'weedManagement', title: 'Weed Management', icon: '🌱'},
  {id: 'harvesting', title: 'Harvesting', icon: '🌱'},
];

const CultivationCategorySelectionScreen = ({navigation}) => {
  const handleCategoryPress = categoryId => {
    navigation.navigate('CultivationTipDetail', {categoryId});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={styles.card}
          onPress={() => handleCategoryPress(category.id)}>
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
  },
});

export default CultivationCategorySelectionScreen;
