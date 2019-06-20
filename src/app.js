const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Game'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Game'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Game'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (err, {latitude, longitude, location}={})=>{
        if(err)
            return res.send({err})
        forecast(latitude, longitude, (fcErr, fcData)=>{
            if(fcErr)
                return res.send({err})
            return res.send({
                forecast: fcData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(res.query)
    return res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Game',
        error: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Game',
        error: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})