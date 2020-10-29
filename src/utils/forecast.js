const request = require('request')

const forecast = (lat,long,callback) => {
const url = 'http://api.weatherstack.com/current?access_key=4e88d35d13391bc2efec70f80346485e&query=' + long + ',' + lat +'&units=f'

request({url, json:true},(error,{body}) => {

  if(error){callback('Unable to connect to weather service',undefined)}
  
  else if(body.error){callback('Unable to find location',undefined)}
  
  else{callback(undefined,'Currently: ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + '.')}
})
}
module.exports = forecast