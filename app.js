"use strict";

function setDay(params) {
  //var date = response.data[params].valid_date;
  var date = new Date(params);
  date.setDate(date.getDate())
  var options = { weekday: 'long'};
  return date.toLocaleDateString(undefined, options)
}
function buttonClickGET() {

    var city = document.getElementById("cityName").value;
    //console.log(city)

    var url = "https://api.weatherbit.io/v2.0/forecast/daily?city="+city+",FR&key=53135f0bd05740b184fc8be1398ebacf&lang=fr&days=7"

    var httpRequest = new XMLHttpRequest();
  
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

          var response = JSON.parse(this.responseText);
          //console.log(response)

          var cityName = document.getElementById("city_name");
          cityName.innerHTML = response.city_name;

          var minMaxTemp = document.getElementById("minMaxTemp");
          minMaxTemp.innerHTML = "&#8595;" + response.data[0].app_min_temp + "° " + "&#8593;" + response.data[0].app_max_temp + "°"

          var dayName = document.getElementById("dayName");
          dayName.innerHTML = setDay(response.data[0].valid_date);

          var date = document.getElementById("date");
          date.innerHTML = response.data[0].datetime

          var wind = document.getElementById("wind");
          wind.innerHTML = "Vent " + Math.round(response.data[0].wind_spd) + "km/h"

          var humidity = document.getElementById("humidity");
          humidity.innerHTML = "H " + response.data[0].rh +"%"

          var icon = document.getElementById("icon");
          icon.setAttribute("src", "https://www.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png");
          icon.setAttribute("alt", response.data[0].weather.description);    
          
          var description = document.getElementById("description");
          description.innerHTML = response.data[0].weather.description ;
          
          var temp = document.getElementById("temp");
          temp.innerHTML = response.data[0].temp + "°";

          /* prevision semaine */
          // var
          // dayName.innerHTML = setDay(0);
          // var icon1 = document.getElementById("icon");
          // icon1.setAttribute("src", "https://www.weatherbit.io/static/img/icons/" + response.data[1].weather.icon + ".png");
          // var temp1 = document.getElementById("temp");
          // temp.innerHTML = response.data[1].temp + "°";

          response.data.forEach(element => {
                var meteo = document.getElementById('nextprev');
                var newElement = document.createElement('div');
                newElement.innerHTML ='<p>'+setDay(element.valid_date)+'</p>' + '<img src="https://www.weatherbit.io/static/img/icons/'+element.weather.icon+'.png" >' + '<p>'+element.temp+'</p>'
                meteo.appendChild(newElement);
              }
            );
      }
    };

    httpRequest.open("GET", url, true);
    httpRequest.send();

}

