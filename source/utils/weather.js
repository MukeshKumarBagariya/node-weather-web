const request = require('request')

const weather = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f71fd3715cb4931ae19e0c31f061c79b/'+lattitude+','+longitude+'?units=si'
    request({url , json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect the weather services ', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else [
            callback(undefined, body.currently.icon+'  And  Current  tempreture  is  '+body.currently.temperature+'  Minimum  Tempreture  Of  The Day Is  '+body.daily.data[0].temperatureMin+ '  And  Max  Tempreture  Of  The  Day  Is  ' + body.daily.data[0].temperatureHigh)
        ]
    })
}
module.exports = weather