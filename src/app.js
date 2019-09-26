const path = require('path')
const express = require('express');
const hbs = require('hbs')
const temperature = require('../src/utils/temperature')

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../public/templates/views')
const partialsPath = path.join(__dirname, '../public/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "John",
        year: new Date().getFullYear('YYYY')
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Me",
        year: new Date().getFullYear('YYYY')
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('You must provide an address...')
    }

    temperature.getCoordsCity(req.query.address, (errors, {
        latitude,
        longitude
    } = {}) => {
        if (errors) {
            return res.send(errors)
        }

        temperature.getForecast(latitude, longitude, (errors, temp) => {
            if (errors) {
                return res.send({errors})
            }

            res.send(temp);
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send('You must provide an search term...')
    }

    res.send({
        products: []
    })
})

app.get('/about/*', (req, res) => {
    res.send('Help page not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 NOT FOUND",
        year: new Date().getFullYear('YYYY')
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})