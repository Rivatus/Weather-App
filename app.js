const express = require("express");
const https = require("https");
const bp = require("body-parser");

const app = new express();

app.use(bp.urlencoded({ extended: true }));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.city , unit = "metric";
  const appid = process.env.appId;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit ;
  https.get(url,function(response){

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherdesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The Weather is currently " + weatherdesc + "</p>");
      res.write("<h1>The Temperature in " + query + " is " + temp + " Degree Celcius</h1>");
      res.write("<img src = \"" + imageurl + "\" alt = \"" + weatherdesc + "\">");
      res.send();
    });
  });
});


app.listen(3000,function(){
  console.log("server is running in port 3000");
});
