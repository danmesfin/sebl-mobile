import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather data
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=YOUR_API_KEY`,
      );
      setCurrentWeather(currentWeatherResponse.data);

      // Fetch weather forecast data
      const forecastWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=YOUR_API_KEY`,
      );
      setForecastWeather(forecastWeatherResponse.data);

      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search location..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={fetchWeatherData}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View>
          <CurrentWeather weather={currentWeather} />
          <ForecastWeather weather={forecastWeather} />
          {/* Forecast Weather Component */}
        </View>
      )}
    </View>
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
