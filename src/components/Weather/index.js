import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import getWeatherIcons from '../../utils/getWeatherIcon';
const WeatherSection = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?lat=9.02&lon=38.75&appid=335678deab421377846a489f801c380e',
      )
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!weatherData) {
    return null;
  }

  const {main, weather, wind, rain, name} = weatherData;
  const temperature = isLoading ? '- -' : Math.round(main.temp - 273.15);
  const weatherDescription = isLoading ? '- -' : weather[0].description;
  const humidity = isLoading ? '- -' : main.humidity;
  const rainAmount = isLoading ? '- -' : rain?.['1h'] || 0;
  const windSpeed = isLoading ? '- -' : wind.speed;

  return (
    <View style={styles.container}>
      <View style={styles.weatherInfo}>
        <Image
          style={styles.weatherIcon}
          source={getWeatherIcons(weather[0].icon)}
        />
        <Text style={styles.temperature}>{temperature}°C</Text>
      </View>
      <Text style={styles.city}>{name}</Text>
      <Text style={styles.weatherDescription}>{weatherDescription}</Text>
      {/* <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{humidity}%</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Rain</Text>
          <Text style={styles.detailValue}>{rainAmount} mm/h</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{windSpeed} km/h</Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F6FA',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 64,
    height: 64,
    marginRight: 10,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#212529',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#212529',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
});

export default WeatherSection;
