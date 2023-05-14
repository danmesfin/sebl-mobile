import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const TipsViewScreen = ({route, navigation}) => {
  const {cropType, category, title} = route.params;
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://sebl.onrender.com/tips/${cropType}/${category}/${title}`)
      .then(response => {
        setTips(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [category, cropType, title]);

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>
          {title}
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{marginTop: 20}}
        />
      ) : (
        <ScrollView style={{flex: 1, padding: 10}}>
          {tips.map(tip => (
            <View key={tip.id} style={{marginBottom: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{tip.id}</Text>
              <Text>{tip.content}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TipsViewScreen;
