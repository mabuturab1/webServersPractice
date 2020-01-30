const http = require("./utils.js");
const weatherData = (address, callback) => {
  http.findLocationData(address, (error, response) =>
    getWeatherData(error, response, callback)
  );
};
const getWeatherData = (error, { center, place_name } = {}, callback) => {
  if (error) callback(error, undefined);
  else {
    http.weatherUpdate(
      encodeURIComponent(center[1]),
      encodeURIComponent(center[0]),
      encodeURIComponent(place_name),
      callback
    );
    console.log(`longitude is ${center[1]} and latitude is ${center[0]}`);
  }
};

module.exports = {
  weatherData: weatherData
};
