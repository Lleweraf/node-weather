console.log('Client side javascript file loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMessage = document.querySelector('#location')
const forecastMessage = document.querySelector('#forecast')
const errorMessage = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  locationMessage.textContent = 'Searching...'
  forecastMessage.textContent = 'Loading...'

  fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorMessage.style.display = 'block'
        locationMessage.style.display = 'none'
        forecastMessage.style.display = 'none'
        errorMessage.textContent = data.error
        // console.log(data.error)
      } else {
        errorMessage.style.display = 'none'
        locationMessage.style.display = 'block'
        forecastMessage.style.display = 'block'
        locationMessage.textContent = data.location
        forecastMessage.textContent = data.forecast
        // console.log(data.location)
        // console.log(data.forecast)
      }
    })
  })
})
