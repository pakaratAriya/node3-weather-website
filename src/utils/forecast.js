const request = require('request')

const forecast = (latitude, longitude, callbacks) => {
    const url = "https://api.darksky.net/forecast/c1e28157d9032b4da201003ed7a85a2c/" + latitude + ", " + longitude
    request({url, json: true},(error,{body})=>{
        if(error){
            callbacks('Unable to connect to weather service', undefined)
        }else if(body.error){
            callbacks('Please insert your location again', undefined)        
        }else{
            callbacks(undefined, body.daily.data[0].summary + " It is currently " + ((body.currently.temperature-32)/9*5) + " degrees out. There is a "
                     + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast;