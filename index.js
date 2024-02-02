// index.js
const {fetchISSFlyOverTimes} = require('./iss.js');

fetchISSFlyOverTimes({ latitude: 44.1539514, longitude: -79.8691544 }, (error, flyOverTimes) => {
  if (error) {
    console.log("Error, did not get Fly Over Times: ", error);
    return;
  }
  console.log('It worked! Returned Fly Over Times: \n' , flyOverTimes);

});