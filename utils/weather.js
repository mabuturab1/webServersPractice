const http = require("./utils.js");
// const yargs = require("yargs");
const getLocationData = (error, { center, place_name } = {}, callback) => {
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
// const command = process.argv[2];

const weatherData = (address, callback) => {
  http.findLocationData(address, (error, response) =>
    getLocationData(error, response, callback)
  );
};
// if (command == "weatherData") {
//   console.log(process.argv);
//   if (process.argv.length < 4) {
//     console.log(
//       "please provide a valid address eg node app.js weatherData London"
//     );
//     return;
//   }
//   weatherData(process.argv[3]);
// } else console.log("Not a valid function");
// findLocationData("Lahore", getLocationData);
const showWeatherData = (error, response) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(
    `Currently the temperature at ${response.place} is ${response.temperature}. There is ${response.precipProbability}% chances of rain. The summary is ${response.summary}`
  );
};
// yargs.command({
//   command: "weather",
//   describe: "get weather update",
//   builder: {
//     city: {
//       type: "string",
//       demandOption: true,
//       describe: "enter city name"
//     }
//   },
//   handler: argv => {
//     http.findLocationData(argv.city, getLocationData);
//   }
// });

// console.log(yargs.argv);
module.exports = {
  weatherData: weatherData
};
