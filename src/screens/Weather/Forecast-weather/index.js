import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';

// ...

const ForecastWeather = ({forecast, loading}) => {
  if (loading) {
    return <ActivityIndicator size="large" color="gray" />;
  }

  const getWeatherIcon = iconCode => {
    // Add mapping for weather icons
    switch (iconCode) {
      case '01d':
        return 'sun';
      case '02d':
        return 'cloud';
      case '03d':
        return 'cloud-drizzle';
      case '04d':
        return 'cloud';
      case '09d':
        return 'cloud-rain';
      case '10d':
        return 'cloud-drizzle';
      case '11d':
        return 'cloud-lightning';
      case '13d':
        return 'cloud-snow';
      case '50d':
        return 'cloud-drizzle';
      default:
        return 'question-mark';
    }
  };

  const renderTemperatureChart = () => {
    const data = {
      labels: forecast.list.map(data => data.dt_txt.split(' ')[1]),
      datasets: [
        {
          data: forecast.list.map(data => Math.round(data.main.temp - 273.15)),
        },
      ],
    };

    return (
      <LineChart
        data={data}
        width={350}
        height={200}
        chartConfig={
          {
            // ... chart configuration
          }
        }
      />
    );
  };

  const renderRainfallChart = () => {
    const data = {
      labels: forecast.list.map(data => data.dt_txt.split(' ')[1]),
      datasets: [
        {
          data: forecast.list.map(data => (data.rain ? data.rain['3h'] : 0)),
        },
      ],
    };

    return (
      <BarChart
        data={data}
        width={350}
        height={200}
        chartConfig={
          {
            // ... chart configuration
          }
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forecast Weather</Text>
      {renderTemperatureChart()}
      {renderRainfallChart()}
      <View style={styles.weatherDetails}>
        {forecast.list.map(data => (
          <View key={data.dt} style={styles.weatherItem}>
            <Text style={styles.time}>{data.dt_txt.split(' ')[1]}</Text>
            <Icon
              name={getWeatherIcon(data.weather[0].icon)}
              size={24}
              color="black"
            />
            <Text style={styles.temperature}>
              {Math.round(data.main.temp - 273.15)}°C
            </Text>
            {data.weather[0].main === 'Rain' && (
              <Text style={styles.rainfall}>
                Rainfall: {data.rain ? data.rain['3h'] : 'Unknown'}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  weatherItem: {
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    marginBottom: 5,
  },
  temperature: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ForecastWeather;
