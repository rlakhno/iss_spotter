// index.js
const {fetchCoordsByIP} = require('./iss.js');

fetchCoordsByIP('184.144.95.32', (error, coordinates) => {
  if (error) {
    console.log("Error, did not get coordinated: ", error);
    return;
  }
  console.log('It worked! Returned coordinates:' , coordinates);

});