import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {firebase} from '../../../firebaseConfig';
import axios from 'axios';
import theme from '../../styles/theme';

const TipsViewScreen = ({route, navigation}) => {
  const {cropType, category, title} = route.params;
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTipData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropType]);

  const fetchTipData = async () => {
    const user = firebase.auth().currentUser;
    const token = await user.getIdToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `https://sebl.onrender.com/tips/${cropType}/${category}/${title}`,
        {
          headers: headers,
        },
      );
      if (response.data) {
        setTips(response.data);
      } else {
        setError('Data not available right now. Please try again later.');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={theme.accent}
          style={styles.activityIndicator}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tipsContainer}>
          <View style={styles.tipsId}>
            <Text style={styles.tipsIdText}>{tips.id}</Text>
          </View>
          {tips.content.tips.map((tip, index) => (
            <View style={styles.tipContent} key={index}>
              <Image
                source={require('../../../assets/icons/bullet.png')}
                style={styles.icon}
              />
              <Text style={styles.tipsContent}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  activityIndicator: {marginTop: 120},
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
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipsIdText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.textPrimary,
  },
  tipsContent: {
    paddingHorizontal: 8,
    fontSize: 16,
    marginTop: 10,
    color: theme.textPrimary,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default TipsViewScreen;
