import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';
import getWeatherIcon from '../../../utils/getWeatherIcon';

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
      <Feather
        name={getWeatherIcon(weatherData.weather[0].icon)}
        size={100}
        color="black"
      />
      <Text style={styles.description}>
        {weatherData.weather[0].description}
      </Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsItem}>
          <Feather name="trending-up" size={24} color="black" />
          <Text style={styles.detailsLabel}>Max Temp</Text>
          <Text style={styles.detailsValue}>
            {Math.round(weatherData.main.temp_max - 273.15)}°C
          </Text>
        </View>
        <View style={styles.detailsItem}>
          <Feather name="trending-down" size={24} color="black" />
          <Text style={styles.detailsLabel}>Min Temp</Text>
          <Text style={styles.detailsValue}>
            {Math.round(weatherData.main.temp_min - 273.15)}°C
          </Text>
        </View>
        <View style={styles.detailsItem}>
          <Feather name="droplet" size={24} color="black" />
          <Text style={styles.detailsLabel}>Humidity</Text>
          <Text style={styles.detailsValue}>{weatherData.main.humidity}%</Text>
        </View>
        <View style={styles.detailsItem}>
          <Feather name="wind" size={24} color="black" />
          <Text style={styles.detailsLabel}>Wind Speed</Text>
          <Text style={styles.detailsValue}>{weatherData.wind.speed} m/s</Text>
        </View>
      </View>
      {/* <Text style={styles.timestamp}>Last updated: {formatDate(weatherData.dt)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
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
  },
  detailsLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default CurrentWeather;
