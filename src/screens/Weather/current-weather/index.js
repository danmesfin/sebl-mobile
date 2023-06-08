import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import getWeatherIcon from '../../../utils/getWeatherIcon';
import theme from '../../../styles/theme';
import getFormattedTimeDifference from '../../../utils/formattedTimeDifference';

const CurrentWeather = ({weatherData, loading}) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }

  const getWeatherIconn = iconCode => {
    // ... code for getting weather icons
  };

  const formatDate = timestamp => {
    // ... code for formatting the timestamp
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather</Text>
      <Text style={styles.location}>{weatherData.name}</Text>
      <Text style={styles.temperature}>
        {Math.round(weatherData.main.temp - 273.15)}°C
      </Text>
      <Image
        source={getWeatherIcon(weatherData.weather[0].icon)}
        style={styles.weatherIcon}
        //size={100}
        //color="black"
      />
      <Text style={styles.description}>
        {weatherData.weather[0].description}
      </Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsItem}>
          <Icon name="trending-up" size={24} color="black" />
          <Text style={styles.detailsLabel}>Max Temp</Text>
          <Text style={styles.detailsValue}>
            {Math.round(weatherData.main.temp_max - 273.15)}°C
          </Text>
        </View>
        <View style={styles.detailsItem}>
          <Icon name="trending-down" size={24} color="black" />
          <Text style={styles.detailsLabel}>Min Temp</Text>
          <Text style={styles.detailsValue}>
            {Math.round(weatherData.main.temp_min - 273.15)}°C
          </Text>
        </View>
        <View style={styles.detailsItem}>
          <Icon name="droplet" size={24} color="black" />
          <Text style={styles.detailsLabel}>Humidity</Text>
          <Text style={styles.detailsValue}>{weatherData.main.humidity}%</Text>
        </View>
        <View style={styles.detailsItem}>
          <Icon name="wind" size={24} color="black" />
          <Text style={styles.detailsLabel}>Wind Speed</Text>
          <Text style={styles.detailsValue}>{weatherData.wind.speed} m/s</Text>
        </View>
      </View>
      {/* {
        <Text style={styles.timestamp}>
          Last updated: {getFormattedTimeDifference(weatherData.dt)}
        </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    //borderWidth: 0.5,
    //borderColor: theme.primaryLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 20,
    marginVertical: 10,
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  detailsItem: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  detailsLabel: {
    fontSize: 14,
    marginTop: 5,
    color: theme.primaryDark,
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 10,
  },
  weatherIcon: {
    height: 100,
    width: 100,
  },
});

export default CurrentWeather;
