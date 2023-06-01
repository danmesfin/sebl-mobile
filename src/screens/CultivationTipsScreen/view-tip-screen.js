import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {firebase} from '../../../firebaseConfig';
import axios from 'axios';
import theme from '../../styles/theme';
//import colors from '../../styles/theme';

const TipsViewScreen = ({route, navigation}) => {
  const {cropType, category, title} = route.params;
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setTips(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={theme.accent}
          style={styles.activityIndicator}
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
  tipsIdText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.textPrimary,
  },
  tipsContent: {
    fontSize: 14,
    marginTop: 10,
    color: theme.textPrimary,
  },
});

export default TipsViewScreen;
