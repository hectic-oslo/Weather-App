const express= require('express')
const request = require('request');

// const url='http://api.weatherstack.com/current?access_key=55c4ddd8bb8370897d84b83cd58a0801&query=New%20York'

//  const address=process.argv[2]
const forecast =(address,callback)=>{


    const wurl=`http://api.weatherstack.com/current?access_key=55c4ddd8bb8370897d84b83cd58a0801&query=${address}`

    request({url:wurl,json:true},(error,response)=>{
        if(error)
        {
            callback("Check your network!",undefined)
        }
        else if(response.body.error)
        {
            console.log("inside error")
            callback("unable to get city.try another search!",undefined)
        }
        else
        {
        //   callback(undefined,{
        //       location: [response.body.location.name,response.body.location.country],
        //       forecast: "the temperature is"+response.body.current.temperature+' degree celcius And the weather is '+response.body.current.weather_descriptions
        
        //   })
        
        callback(undefined,
             "the temperature is "+response.body.current.temperature+' degree celcius And the weather is '+response.body.current.weather_descriptions
      
        )
        }
    })
}
// forecast(address,(error,data)=>{
//  console.log(error)
//  console.log(data)
// })
 module.exports=forecast