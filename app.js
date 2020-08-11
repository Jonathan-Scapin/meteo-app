"use strict";

function buttonClickGET() {

    var city = document.getElementById("cityName").value;
    console.log(city)

    var url = "https://api.weatherbit.io/v2.0/forecast/daily?city="+city+",FR&key=53135f0bd05740b184fc8be1398ebacf&lang=fr&days=5"

    var httpRequest = new XMLHttpRequest();
  
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

          var response = JSON.parse(this.responseText);
          console.log(response)
          console.log(response.city_name)

          var cityName = document.getElementById("city_name");
          cityName.innerHTML = response.city_name;

          var minMaxTemp = document.getElementById("minMaxTemp");
          minMaxTemp.innerHTML = "min " + response.data[0].app_min_temp + " " + "max " + response.data[0].app_max_temp

          var dayName = document.getElementById("dayName");
          dayName.innerHTML = "test lundi"

          var date = document.getElementById("date");
          date.innerHTML = response.data[0].datetime

          var wind = document.getElementById("wind");
          wind.innerHTML = "Vent " + response.data[0].wind_spd + "km/h"

          var humidity = document.getElementById("humidity");
          humidity.innerHTML = response.data[0].rh +"%"

          var icon = document.getElementById("icon");
          icon.setAttribute("src", "https://www.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png");
          icon.setAttribute("alt", response.data[0].weather.description);    
          
          var description = document.getElementById("description");
          description.innerHTML = response.data[0].weather.description ;
          
          var temp = document.getElementById("temp");
          temp.innerHTML = response.data[0].temp + "°";
      }
    };

    httpRequest.open("GET", url, true);
    httpRequest.send();

}

