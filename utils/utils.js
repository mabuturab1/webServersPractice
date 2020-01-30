const request = require("request");
weatherUpdate = (lat = 0, long = 0, place = "", callback) => {
  request({ url: getURL(lat, long), json: true }, (error, { body }) => {
    if (error) callback(error, undefined);
    else if (body.error) {
      callback(error, undefined);
    } else {
      var { currently } = body;
      var { data: currentlyDaily } = body.daily;
      console.log(currentlyDaily[0]);
      callback(undefined, {
        place,
        temperature: currently.temperature,
        precipProbability: currently.precipProbability,
        summary: currentlyDaily[0].summary,
        temperatureHigh: currentlyDaily[0].temperatureHigh,
        temperatureLow: currentlyDaily[0].temperatureLow
      });
    }
  });
};
const findLocationData = (address, callback) => {
  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWFidXR1cmFiIiwiYSI6ImNrNXhtbG1xcDA1OTYzZGxtbm53bXR5cTIifQ.lBp_ZR76m7E_ADNINg3nWw&limit=1`;
  request({ url: mapBoxUrl, json: true }, (error, { body }) => {
    if (error) callback("An Error Occurred", undefined);
    else if (body.error) {
      callback("Unable to find location", undefined);
    } else if (!body.features) {
      callback("Not valid address", undefined);
    } else if (body.features.length < 1) {
      callback("Not valid address", undefined);
    } else {
      callback(undefined, body.features[0]);
    }
  });
};
const getURL = (myLatitude, myLongitude) => {
  return `https://api.darksky.net/forecast/17a0dc2bca499660f7eeefb5b982c376/${myLatitude},${myLongitude}?units=si`;
};
module.exports = {
  findLocationData: findLocationData,
  weatherUpdate: weatherUpdate
};
