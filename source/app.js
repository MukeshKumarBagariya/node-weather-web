const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

const partialsPath = path.join(__dirname, '/partials' )

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Mukesh Kumar Bagariya' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is Some Helpfula Text',
        title : "Help",
        name : "Mukesh Kumar Bagariya"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Mukesh Kumar Bagariya'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'Please provide an valid address'
        })
    }
    geoCode(req.query.address,(error, {lattitude, longitude, location} = {}) => {

        if (error) {
          return res.send({
              error : error
          })
        }
         weather(lattitude, longitude, (error, forcast) => {
          if (error) {
            return res.send({
                error : error
            })
          }
          res.send({
              location : location,
              forcast : forcast
          }) 
        })
        
      })
      
})

app.get('*', (req, res) => {
    res.render('404')
})


app.listen(port, () => {
    console.log('Web services running on port number '+port)
})