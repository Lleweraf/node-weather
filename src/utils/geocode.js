const request = require('postman-request')

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?limit=1&access_token=pk.eyJ1IjoibGxld2VyYWYiLCJhIjoiY2ttbGJ5d2F3MTljOTJ2czdzbHFjb3N1bSJ9.EHzRaSmkLAO-ejDNTgYOqw'

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services')
    } else if (body.features.length === 0) {
      callback('No search results found! Try another search.')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
