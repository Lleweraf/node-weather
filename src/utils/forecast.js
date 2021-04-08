const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=fa2f718d50ee5d4e5d0a87cffe6b545d&query=' +
    latitude +
    ',' +
    longitude

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to server.')
    } else if (body.error) {
      callback('Unable to find location.')
    } else {
      callback(undefined, `Current tempetature is ${body.current.temperature}deg @ ${body.current.observation_time}`)
    }
  })
}

module.exports = forecast
