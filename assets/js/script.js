var searchField = document.getElementById("search-field")
var searchButton = document.getElementById("search-btn")
var cityNameEl = document.getElementById("city-name")
var currentContainer = document.getElementById("current-weather")
var searchHistoryContainer = document.getElementById("search-history")

var APIKey = "f31f098d0ca4ea130ecb62f6ef16acc8";
var lat;
var long;

var pastSearches = [];

var getCurrentWeather = function () {
    var city = searchField.value.trim();
    currentContainer.innerHTML = "";
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var cityName = data.name;
            var cityNameEl = document.createElement('h3')
            cityNameEl.textContent = cityName;

            if (!pastSearches.includes(cityName)) {
                pastSearches.push(cityName);
                
                var historyBtn = document.createElement('button');
                historyBtn.setAttribute('class', 'btn btn-secondary')
                historyBtn.textContent = cityName;
                searchHistoryContainer.append(historyBtn);
              }
            localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
            
            var iconcode = data.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var iconEl = document.createElement('img')
            iconEl.setAttribute('src', iconurl);
            
            cityNameEl.appendChild(iconEl);
            currentContainer.append(cityNameEl);

            var tempEl = document.createElement('p');
            tempEl.textContent = "Temp: " + data.main.temp + "°F";
            currentContainer.append(tempEl);

            var windEl = document.createElement('p');
            windEl.textContent = "Wind: " + data.wind.speed + " MPH"
            currentContainer.append(windEl);

            var humidityEl = document.createElement('p');
            humidityEl.textContent = "Humidity: " + data.main.humidity + " %"
            currentContainer.append(humidityEl);

          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Weather Map');
      });
  };

var getWeatherForecast = function (user) {
    var city = searchField.value.trim();
    // var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Weather Map');
      });
  };

  searchButton.addEventListener('click', getCurrentWeather);
  searchButton.addEventListener('click', getWeatherForecast);
