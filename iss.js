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
    const {latitude, longitude} = data;
    callback(null, {latitude, longitude}); // latitude, longitude
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP};