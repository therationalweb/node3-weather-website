const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express configuration
  const publicDirectoryPath = path.join(__dirname,'../public')
  const viewsPath = path.join(__dirname,'../templates/views')
  const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
  app.set('view engine','hbs')
  app.set('views',viewsPath)
  hbs.registerPartials(partialsPath)
  
// Setup static directory to serve
  app.use(express.static(path.join(__dirname,'../public')))

// route handlers
  app.get('',(req,res) => { res.render('index',{title:'Weather Application',name:'Thomas'})}) 
  app.get('/about',(req,res) =>{res.render('about',{title:'About',name:'Thomas'})})
  app.get('/help',(req,res) => {res.render('help',{title:'Help Page',message:'Please review the following resoure.',name:'Thomas'})})
  
  app.get('/weather',(req,res) => {
    if(!req.query.address){
      return res.send({error:'You must provide an address'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
      if(error){return res.send({error})}
      forecast(latitude, longitude, (error, forecastData) => {
       if(error){ return res.send({error}) }
       res.send({
        forecast:forecastData,
        location:location, 
        address:req.query.address})
     })
     })
  })

  app.get('/products',(req,res) => {
    if(!req.query.search){
      return res.send({error:'You must provide a search term'})

    }

    console.log(req.query)
    res.send({products:[]})})

  app.get('/help/*',(req,res) =>{res.render('missing',{title:'Missing Page',name:'Thomas',message:"Help Page Not Found"})}) // help specific 404 handler
  app.get('*',(req,res) =>{res.render('missing',{title:'Missing Page',name:'Thomas',message:"Page Not Found"})}) // 404 handler

// start the server
  app.listen(port,() =>{console.log('Server is up on port' + port)})     
