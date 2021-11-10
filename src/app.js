const path = require('path')
var hbs = require('hbs')
const express = require('express')
const app = express()
const forecast=require('./forecast')
const { request } = require('express')
//define path for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

//setup handlebars engine and viewslocation
 app.set('view engine','hbs')
 app.set('views',viewpath)
 hbs.registerPartials(partialsPath)

 //setup static directory to serve
 app.use(express.static(publicDirectoryPath))
 

app.get('',  (req, res)=>{
  res.render('index',{
    title:'WEATHER APP',
    name:"Abhishek Kumar"
  })
})

app.get('/about',  (req, res)=>{
  res.render('about',{
    title:'"Home Page"',
    name:"Abhishek Kumar"
  })
})
 // app.get('/',  (req, res)=>{
//   res.send("<h1>'hello world'</h1>")
// })
// app.get('/about',  (req, res)=>{
//   res.send("<h1>About us'</h1>")
// })

app.get('/help',  (req, res)=>{
  res.render('help',{
    help:"Due to covid-19 pandemic,currently Help section is not availiable.you can contact us through mail"
  })

})
app.get('/weather',  (req, res)=>{
  if(!req.query.address)
  {
    return res.send({
      error:"provide location!!"
    })
  }

  forecast(req.query.address,(error,data)=>{
    if(error)
    {
      return res.send({error})
    }
    res.send({
      forecast:data,
      location:req.query.address
    })
   })
  // res.send({
  //   location:req.query.location,
  //   forecast:'Its cloudy here'
  // })
})
app.get('*',(req,res)=>{
 res.render('404',{
  title:'404',
  msg :"page Not Found "
 }
 )

})

app.listen(3000,()=>{console.log("server started at port 3000")})