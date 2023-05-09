const getWeatherIcons = weatherCode => {
  let icon = null;
  switch (weatherCode) {
    case '01d':
      icon = require('./assets/sunny.png');
      break;
    case '01n':
      icon = require('./assets/clear-night.png');
      break;
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      icon = require('./assets/cloudy.png');
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      icon = require('./assets/rain.png');
      break;
    case '11d':
    case '11n':
      icon = require('./assets/thunderstorm.png');
      break;
    case '13d':
    case '13n':
      icon = require('./assets/snow.png');
      break;
    case '50d':
    case '50n':
      icon = require('./assets/mist.png');
      break;
    default:
      icon = require('./assets/sunny.png');
      break;
  }
  return icon;
};

export default getWeatherIcons;
