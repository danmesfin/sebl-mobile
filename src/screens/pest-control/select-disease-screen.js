import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

const diseaseList = [
  'apple scab',
  'apple black rot',
  'apple cedar apple rust',
  'cherry sour powdery mildew',
  'corn cercospora leaf spot',
  'corn common rust',
  'corn maize northern leaf blight',
  'coffee leaf rust',
  'grape black rot',
  'grape esca black measles',
  'grape leaf blight isariopsis leaf spot',
  'orange haunglongbing citrus greening',
  'peach bacterial spot',
  'pepper bell bacterial spot',
  'potato early blight',
  'potato late blight',
  'squash powdery mildew',
  'strawberry leaf scorch',
  'teff leaf spot',
  'tomato bacterial spot',
  'tomato early blight',
  'tomato late blight',
  'tomato leaf mold',
  'tomato septoria leaf spot',
  'tomato spider mites two spotted spider mite',
  'tomato target spot',
  'tomato tomato yellow leaf curl virus',
  'tomato tomato mosaic virus',
  'wheat stem rust',
];

const SelectDiseaseScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDiseases, setFilteredDiseases] = useState(diseaseList);

  const selectDisease = disease => {
    navigation.navigate('view-disease-control-methods', {diseaseName: disease});
  };

  const handleSearch = text => {
    setSearchTerm(text);
    const filtered = diseaseList.filter(disease =>
      disease.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDiseases(filtered);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.diseaseItem}
      onPress={() => selectDisease(item)}>
      <Text style={styles.diseaseName}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Select Disease</Text> */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredDiseases}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 0.9,
  },
  diseaseItem: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  diseaseName: {
    fontSize: 16,
    color: 'black',
  },
});

export default SelectDiseaseScreen;
