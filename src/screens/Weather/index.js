/* eslint-disable no-catch-shadow */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import CurrentWeather from './current-weather';
import ForecastWeather from './Forecast-weather';

const WeatherScreen = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather data
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=9.00&lon=38.75&appid=335678deab421377846a489f801c380e`,
      );
      //console.log(currentWeatherResponse.data, 'current weather data');
      setCurrentWeather(currentWeatherResponse.data);

      // Fetch weather forecast data
      const forecastWeatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=9.02&longitude=38.75&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto`,
      );
      console.log('forecasr', forecastWeatherResponse.data);
      setForecastWeather(forecastWeatherResponse.data);

      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data.');
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search location..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={fetchWeatherData}
      />
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View>
          <CurrentWeather weatherData={currentWeather} loading={loading} />
          <ForecastWeather forecast={forecastWeather} loading={loading} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default WeatherScreen;
