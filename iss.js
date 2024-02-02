// iss.js
const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const apiUrl = 'https://api.ipify.org?format=json';

  request(apiUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        callback(null, data);
      } else {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
    }
  });

};

const fetchCoordsByIP = function(ip, callback) {
  const apiUrl = `http://ipwho.is/${ip}`;
  request(apiUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const { latitude, longitude } = data;
    callback(null, { latitude, longitude }); // latitude, longitude
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coordinates, callback) {
  
  const apiUrl = `https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  request(apiUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Fly Over Times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).response;
    callback(null, data); // latitude, longitude
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };