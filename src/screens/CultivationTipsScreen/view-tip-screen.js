import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import colors from '../../styles/theme';

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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{
            marginTop: 120,
          }}
        />
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.tipsContainer}>
            <View style={styles.tipsId}>
              <Text style={styles.tipsIdText}>{tips.id}</Text>
            </View>
            <Text style={styles.tipsContent}>{tips.content}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  tipsContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    padding: 20,
  },
  tipsId: {
    marginBottom: 20,
    elevation: 5,
  },
  tipsIdText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  tipsContent: {
    fontSize: 18,
    marginTop: 10,
    color: 'black',
  },
});

export default TipsViewScreen;
