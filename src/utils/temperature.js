var request = require('request')

const Temperature = {
    latitude: 0,
    longitude: 0,

    getCoordsCity(city, callback) {
        const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiY2dpc2NoYWJvdGJlYXVsaWV1IiwiYSI6ImNrMG1qY21pdjE3cDEzb3FvajJ6b2dpaWIifQ.ZvgGBuq1lAFb2UAh497iFQ&limit=1`

        request({
                url: geocodingURL,
                json: true
            },
            (error, {
                body
            }) => {
                if (error) {
                    callback(error, undefined)
                } else if (body.error) {
                    callback(body.error, undefined)
                } else if (!body.features.length) {
                    callback({error: `No City found for ${city}`}, undefined)

                } else {
                    callback(undefined, {
                        longitude: body.features[0].center[0],
                        latitude: body.features[0].center[1]
                    })
                }
            }
        )
    },

    getTemperature(latitude, longitude, callback) {
        const url = `https://api.darksky.net/forecast/e5f9f66b436aafe3851e2047af92838d/${latitude},${longitude}?lang=fr&units=si`

        request({
                url,
                json: true
            },
            (error, {
                body
            }) => {
                if (error) {
                    callback(error, undefined)
                }

                if (body.error) {
                    callback(body.error, undefined)
                }

                const date = new Date(body.daily.data[0].time * 1000)
                // Hours part from the timestamp
                const hours = date.getHours()
                // Minutes part from the timestamp
                const minutes = "0" + date.getMinutes()
                // Seconds part from the timestamp
                const seconds = "0" + date.getSeconds()

                // Will display time in 10:30:23 format
                const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

                callback(undefined, {
                    forecast: `${body.currently.temperature} degrés : ${body.currently.precipProbability} %`,
                    time: `At ${formattedTime}`,
                    summary: `${body.daily.data[0].summary}`
                })
            })
    },

    getForecast(latitude, longitude, callback) {
        const url = `https://api.darksky.net/forecast/e5f9f66b436aafe3851e2047af92838d/${latitude},${longitude}?lang=fr&units=si`
        request({
                url,
                json: true
            },
            (error, {
                body
            }) => {
                if (error) {
                    callback(error, undefined)
                    return
                }

                if (body.error) {
                    callback(body.error, undefined)
                    return
                }

                const date = new Date(body.daily.data[0].time * 1000)
                // Hours part from the timestamp
                const hours = date.getHours()
                // Minutes part from the timestamp
                const minutes = "0" + date.getMinutes()
                // Seconds part from the timestamp
                const seconds = "0" + date.getSeconds()

                // Will display time in 10:30:23 format
                const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

                callback(
                    undefined, {
                        temperature: body.currently.temperature,
                        precipProbability: body.currently.precipProbability,
                        time: formattedTime,
                        summary: body.daily.data[0].summary
                    }
                )
            }
        )
    }
}


module.exports = Temperature