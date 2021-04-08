const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home',
    created: 'Ralph Lauren Guintu'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Maki "Kikimaks" Guintu',
    created: 'Ralph Lauren Guintu'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae repellat temporibus autem veritatis illum quaerat nihil consequuntur est perspiciatis delectus?',
    created: 'Ralph Lauren Guintu'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  const address = req.query.address
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    //latitude - longitude
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        location: location,
        forecast: forecastData
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    message: 'Uh-oh! Help article not found.',
    created: 'Ralph Lauren Guintu'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    message: 'Uh-oh! Page not found.',
    created: 'Ralph Lauren Guintu'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
