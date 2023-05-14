import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const cropsData = [
  {
    id: 1,
    name: 'Tomatoes',
    image: require('../../../assets/icons/apple.png'),
  },
  {
    id: 2,
    name: 'Carrots',
    image: require('../../../assets/icons/apple.png'),
  },
  {
    id: 3,
    name: 'Lettuce',
    image: require('../../../assets/icons/apple.png'),
  },
  {
    id: 4,
    name: 'Broccoli',
    image: require('../../../assets/icons/apple.png'),
  },
  {
    id: 5,
    name: 'Bell peppers',
    image: require('../../../assets/icons/apple.png'),
  },
  {
    id: 6,
    name: 'Cucumbers',
    image: require('../../../assets/icons/apple.png'),
  },
];

const CropCard = ({crop}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        console.log(`Navigate to ${crop.name} cultivation tips screen`)
      }>
      <Image source={crop.image} style={styles.image} />
      <Text style={styles.title}>{crop.name}</Text>
    </TouchableOpacity>
  );
};

const SelectCropScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {cropsData.map(crop => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  card: {
    width: '31%',
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
});

export default SelectCropScreen;
