const request = require('request');

const geocode = (address, callbacks) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZ2FtZW9mZ29sZiIsImEiOiJjangwZ3A1cjUwMDB5M3lwOHk3NGp3aXNtIn0.UVhMfiDMpSJzJeSwjTZHXA&limit=1'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callbacks('Unable to connect to location service', undefined)
        }else if(body.features.length === 0){
            callbacks('Unable to find location. Try another search', undefined)
        }else{
            callbacks(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode;