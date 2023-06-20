import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../../styles/theme';
// ...

const ForecastWeather = ({forecast, loading}) => {
  const [activeTab, setActiveTab] = useState('Temperature');

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
  const formatXLabel = value => {
    const date = new Date(value);

    const day = date.getDate().toString();
    const monthIndex = date.getMonth();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[monthIndex];

    return `${day} ${month}`;
  };

  const renderTemperatureChart = () => {
    const temperatureData = {
      labels: forecast.daily.time,
      datasets: [
        {
          data: forecast.daily.temperature_2m_max.map(temp => Math.round(temp)),
          label: 'Max Temperature',
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        },
        {
          data: forecast.daily.temperature_2m_min.map(temp => Math.round(temp)),
          label: 'Min Temperature',
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        },
      ],
    };

    const chartConfig = {
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 20, 0, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '4',
        strokeWidth: '2',
        stroke: '#32A753',
      },
      decimalPlaces: 0,
    };

    return (
      <LineChart
        data={temperatureData}
        width={350}
        height={200}
        chartConfig={chartConfig}
        bezier
        fromZero
        style={styles.chart}
        formatXLabel={value => formatXLabel(value)}
      />
    );
  };
  const formatRainfallXLabel = value => {
    const date = new Date(value);
    const day = date.getDate().toString();
    const month = date.toLocaleString('default', {month: 'short'});
    return `${day} ${month}`;
  };

  const renderRainfallChart = () => {
    const rainfallData = {
      labels: forecast.daily.time.map(value => formatRainfallXLabel(value)),
      datasets: [
        {
          data: forecast.daily.rain_sum.map(rain => rain.toFixed(2)),
          label: 'Rainfall',
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        },
      ],
    };

    const chartConfig = {
      backgroundGradientFrom: theme.secondary,
      backgroundGradientTo: theme.secondary,
      color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 20, 0, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '4',
        strokeWidth: '2',
        stroke: '#32A753',
      },
      decimalPlaces: 0,
    };

    return (
      <BarChart
        data={rainfallData}
        width={350}
        height={200}
        chartConfig={chartConfig}
        style={styles.chart}
        formatXLabel={value => formatRainfallXLabel(value)}
      />
    );
  };

  const handleTabPress = tabName => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forecast Weather</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'Temperature' && styles.activeTabItem,
          ]}
          onPress={() => handleTabPress('Temperature')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Temperature' && styles.activeTabText,
            ]}>
            Temperature
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'Rainfall' && styles.activeTabItem,
          ]}
          onPress={() => handleTabPress('Rainfall')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Rainfall' && styles.activeTabText,
            ]}>
            Rainfall
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chart}>
        {activeTab === 'Temperature'
          ? renderTemperatureChart()
          : renderRainfallChart()}
        {/* ... */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
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
    color: theme.textPrimary,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingHorizontal: 8,
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: theme.primaryDark, // Change to your desired active tab color
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333', // Change to your desired tab text color
  },
  activeTabText: {
    color: theme.primaryDark, // Change to your desired active tab text color
  },
});

export default ForecastWeather;
