import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import getWeatherIcons from '../../utils/getWeatherIcon';
import theme from '../../styles/theme';

const WeatherSection = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  if (!weatherData) {
    return null;
  }

  const currentWeather = weatherData.current_weather;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.weatherInfo}>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>
              {isLoading ? '- -' : currentWeather.temperature}°C
            </Text>
          </View>
          <Text style={styles.weatherDescription}>
            Wind: {isLoading ? '- -' : currentWeather.windspeed} km/h
          </Text>
        </View>
        <View style={styles.weatherInfo}>
          <View style={styles.imageContainer}>
            {isLoading ? (
              '- -'
            ) : (
              <Image
                style={styles.image}
                source={getWeatherIcons(weatherData.weathercode)}
              />
            )}
          </View>
          <View style={styles.humidityInfo}>
            <Text style={styles.weatherDescription}>
              {isLoading ? '- -' : weatherData.hourly.relativehumidity_2m[0]}%
            </Text>
            <Image
              style={styles.icon}
              source={require('../../../assets/icons/humidity.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.yellow,
    opacity: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherInfo: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  temperatureContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
  },
  weatherDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  humidityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  image: {
    height: 80,
    width: 80,
    aspectRatio: 1,
  },
  icon: {
    height: 30,
    width: 30,
    aspectRatio: 1,
    marginLeft: 5,
  },
});

export default WeatherSection;
