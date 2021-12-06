const express = require("express");

const https = require("https")

const app = express();

app.get("/" , function(req , res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1d9c5e8b2eb1c57266af5925316a44d&units=metric";

    https.get(url , function(response){
        //console.log(response.statusCode);

        response.on("data" , function(data){
            const weatherData = JSON.parse(data)
           
            const temp = weatherData.main.temp
            //console.log(temp);
            const weatherDescription = weatherData.weather[0].description
            //console.log(weatherDescription);
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The Temperature in london is " + temp + " degree Celcius.</h1>");
            res.write("<img src=" + imgURL + ">")
            res.send()
        })
    })


})

app.listen(3000,function(){
console.log("The server is running on port 3000");
});