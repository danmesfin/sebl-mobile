import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const WeatherSection = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m',
      )
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!weatherData) {
    return null;
  }

  const currentWeather = weatherData.current_weather;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Weather</Text>
      <View style={styles.weatherInfo}>
        <Text style={styles.temperature}>{currentWeather.temperature}°C</Text>
        <Text style={styles.weatherDescription}>
          Wind: {currentWeather.windspeed} km/h
        </Text>
        <Text style={styles.weatherDescription}>
          Humidity: {weatherData.hourly.relativehumidity_2m[0]}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherInfo: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },  
  weatherDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

export default WeatherSection;
