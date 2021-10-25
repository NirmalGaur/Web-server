// The javaScript code we run is indeed Single Threaded, but Node uses other threads in C++ behind the scenes to manage our events. That allows us to continue our application while we're doing something in the background.

// Making an HTTP request from Node.js application
// To make an API call, we need an API Access key which is used to authenticate when making a request.
// Other then that, we have a base URL which we will combine with other informations including the API access key.
// We can make the API request from the browser tab. For that, we first write the base URL followed by setting up a query string in which we can provide access key as a parameter (a question mark followed by key value pairs, i.e. http://api.weatherstack.com/current?access_key=0e0b59b8db9248cab09f16934f7a8e14&query=37.8267,-122.4233). This gives us the data we require in the json format.

// To make the same http request from Node.js, we will use an NPM Module called request (first we do 'npm init -y' then 'npm i request@2.88.0'):

const request = require('request');
// const url =
//   'http://api.weatherstack.com/current?access_key=0e0b59b8db9248cab09f16934f7a8e14&query=29.7394432,78.4777369'; // To get the data in fahrenheit instead of celsius, we can refer to documentation page of weatherstack, then to the units parameter, there we can see that if we set 'units = f' at the quesry string (concatenate the url with &units=f)
// request({ url: url }, (error, response) => {
//   //we pass in two arguments to the request function: options object, and a funtion to runs when we have that response
//   const data = JSON.parse(response.body); //The body property of the response containes our data in the form of json string
//   // SHOW: console.log(data.current);
// });

// // Request module can automatically parse the json response for us. For this, we costomise the options object: Alongside with url, we write json: true
// request({ url: url, json: true }, (error, response) => {
//   // if we have a value for the error, then no value for the response, and vice-versa
//   if (error) {
//     console.log('Unable to connect to weather service!');
//   } else if (response.body.error) {
//     console.log('Unable to find location');
//   } else {
//     // SHOW: console.log(response.body.current);
//     /* SHOW: console.log(
//       `${response.body.current.weather_descriptions[0]}: it is ${response.body.current.temperature} degrees outside, and feels like ${response.body.current.feelslike} degrees`
//     ); */
//   }
// });

// //Geocoding:
// const geoCodeUrl =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/kotdwar.json?access_token=pk.eyJ1IjoibmlybWFsODE0IiwiYSI6ImNrdXdlZnE5ZTBuMzQyd3FmbW1zZmZkZGUifQ.1VEKMeHm0005Js5syzYpKg&limit=1';
// request({ url: geoCodeUrl, json: true }, (error, response) => {
//   if (error) {
//     // SHOW: console.log('Unable to connect to location service!');
//   } else if (response.body.features.length === 0) {
//     // SHOW: console.log('Unable to find location');
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];
//     // SHOW: console.log(latitude, longitude);
//   }
// });

// Importing geocode function from geocode.js:
const geocode = require('./utility/geocode');

// Importing forecast function from forecast.js:
const forecast = require('./utility/forecast');

const location = process.argv[2];
if (location) {
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    // Destructuring the object and setting empty object as default parameter
    if (error) {
      return console.log(error);
    }
    console.log(latitude, longitude);
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(forecastData);
    });
  });
} else {
  console.log('Please provide a location!');
}
