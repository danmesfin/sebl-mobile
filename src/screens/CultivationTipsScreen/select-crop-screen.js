import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import theme from '../../styles/theme';
const cropsData = [
  {
    id: 1,
    name: 'Tomatoes',
    image: require('../../../assets/icons/tomato.jpg'),
  },
  {
    id: 2,
    name: 'Corn',
    image: require('../../../assets/icons/corn.png'),
  },
  {
    id: 3,
    name: 'Lettuce',
    image: require('../../../assets/icons/lettuce.jpg'),
  },
  {
    id: 4,
    name: 'Broccoli',
    image: require('../../../assets/icons/brocoli.png'),
  },
  {
    id: 5,
    name: 'Wheat',
    image: require('../../../assets/icons/wheat.png'),
  },
  {
    id: 6,
    name: 'Sugarcane',
    image: require('../../../assets/icons/sugarcane.png'),
  },
  {
    id: 7,
    name: 'Barley',
    image: require('../../../assets/icons/barley.jpg'),
  },
  {
    id: 8,
    name: 'Millet',
    image: require('../../../assets/icons/millet.jpg'),
  },
  {
    id: 9,
    name: 'Niger',
    image: require('../../../assets/icons/niger.jpg'),
  },
  {
    id: 10,
    name: 'Sorghum',
    image: require('../../../assets/icons/sorghum.jpg'),
  },
  {
    id: 11,
    name: 'Teff',
    image: require('../../../assets/icons/teff.jpg'),
  },
];

const CropCard = ({crop, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('tip-in-detail-screen', {
          cropType: crop.name,
          icon: crop.image,
        })
      }>
      <Image source={crop.image} style={styles.image} />
      <Text style={styles.title}>{crop.name}</Text>
    </TouchableOpacity>
  );
};

const SelectCropScreen = ({navigation}) => {
  // const [selectedCrop, setSelectedCrop] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header} />
      <View style={styles.row}>
        {cropsData.map(crop => (
          <CropCard key={crop.id} crop={crop} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: theme.primaryLight,
  },
  header: {
    paddingVertical: 10,
    height: 100,
    alignItems: 'flex-start',
    //backgroundColor: theme.primaryDark,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 10,
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
    height: 120,
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
    color: theme.textPrimary,
    marginTop: 10,
  },
});

export default SelectCropScreen;
