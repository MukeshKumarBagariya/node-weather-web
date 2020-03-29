const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXVrZXNoa3VtYXJiYWdhcml5YSIsImEiOiJjazg1d3c3cGMwOG1sM2dvOHJpazZ1OTVpIn0.0DQ9_H3Wfxjr9CzQAFi4og'
    request({url , json : true}, (error, {body} = {}) => {
        if (error){
            callback('Opps.... Something went wrong', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find proivided location, Please enter a valid Location', undefined)
        } else {
             callback(undefined, {
                 lattitude : body.features[0].center[1],
                 longitude : body.features[0].center[0],
                 location : body.features[0].place_name
             })
        }
    })
}


module.exports = geoCode