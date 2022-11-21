var searchField = document.getElementById("search-field")
var searchButton = document.getElementById("search-btn")
var cityNameEl = document.getElementById("city-name")
var currentContainer = document.getElementById("current-weather")
var searchHistoryContainer = document.getElementById("search-history")
var dayCard = document.getElementById("day-one")
var forecastContainer = document.getElementById("forecast-container")

var APIKey = "f31f098d0ca4ea130ecb62f6ef16acc8";

var pastSearches = [];

// The following function renders past search in a list as <button> elements
function renderpastSearches() {
    for (var i = 0; i < pastSearches.length; i++) {
  
        var button = document.createElement("button");
        button.setAttribute('class', 'btn btn-secondary')
        button.textContent = pastSearches[i]
        searchHistoryContainer.append(button);
    }
  }

// This function is being called below and will run when the page loads.
function init() {
    // Get search history from localStorage
    var storedPastSearches = JSON.parse(localStorage.getItem("pastSearches"));

      // If past searches were retrieved from localStorage, update the past searches array to include them
  if (storedPastSearches !== null) {
    pastSearches = storedPastSearches;
  }

    renderpastSearches();
}

// Fetches current weather from Open Weather API an displays it on the page
var getCurrentWeather = function () {
    var city = searchField.value.trim();
    var cityNoSpaces = city.replace(" ", "+")
    currentContainer.innerHTML = "";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNoSpaces + "&appid=" + APIKey + "&units=imperial";
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            currentContainer.setAttribute('style', 'border: 1px solid black')
            var cityName = data.name;
            var today = dayjs();
            var date = today.format('M/D/YYYY');
            var cityNameEl = document.createElement('h3');
            cityNameEl.textContent = cityName + ` (${date})`;

            // If the user enters a city that doesn't already exist in the search history, then add it
            if (!pastSearches.includes(cityName)) {
                pastSearches.push(cityName);
                
                var historyBtn = document.createElement('button');
                historyBtn.setAttribute('class', 'btn btn-secondary')
                historyBtn.textContent = cityName;
                searchHistoryContainer.append(historyBtn);
              }
            localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
            
            // Get weather icon and display it next to city name
            var iconcode = data.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var iconEl = document.createElement('img')
            iconEl.setAttribute('src', iconurl);
            
            cityNameEl.appendChild(iconEl);
            currentContainer.append(cityNameEl);
            
            // Get temp, wind and humidity data and display it in current weather section
            var tempEl = document.createElement('p');
            tempEl.textContent = "Temp: " + data.main.temp + "°F";
            currentContainer.append(tempEl);

            var windEl = document.createElement('p');
            windEl.textContent = "Wind: " + data.wind.speed + " MPH"
            currentContainer.append(windEl);

            var humidityEl = document.createElement('p');
            humidityEl.textContent = "Humidity: " + data.main.humidity + "%"
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

// Fetches 5 day weather forecast from Open Weather API an displays it on the page
var getWeatherForecast = function (user) {
    var city = searchField.value.trim();
    var cityNoSpaces = city.replace(" ", "+")
    forecastContainer.innerHTML = "";
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNoSpaces + "&appid=" + APIKey + "&units=imperial";

  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            
            var forecastHeaderText = document.createElement('h4');
            forecastHeaderText.textContent = "5-Day Forecast:";
            forecastContainer.append(forecastHeaderText);

            // Function that gets date, temp, wind, humidity data and displays it on page
            function renderForecast(id, index) {
                var dayCard = document.getElementById(id)
                dayCard.innerHTML = "";
                
                var dateText = data.list[index].dt_txt;
                var dateSliced = dateText.slice(0, 10);
                var date = dayjs(dateSliced).format('M/D/YYYY');
                var dateEl = document.createElement('h5');
                dateEl.textContent = date;
                var iconcode = data.list[index].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                var iconEl = document.createElement('img')
                iconEl.setAttribute('src', iconurl);
                
                dateEl.appendChild(iconEl);
                dayCard.append(dateEl);
            
                var tempEl = document.createElement('p');
                tempEl.textContent = "Temp: " + data.list[index].main.temp + "°F";
                dayCard.append(tempEl);
            
                var windEl = document.createElement('p');
                windEl.textContent = "Wind: " + data.list[index].wind.speed + " MPH"
                dayCard.append(windEl);
            
                var humidityEl = document.createElement('p');
                humidityEl.textContent = "Humidity: " + data.list[index].main.humidity + "%"
                dayCard.append(humidityEl);
            }
            
            // Gets forecast data for the next 5 days from Open Weather API
            renderForecast("day-one", 0);
            renderForecast("day-two", 8);
            renderForecast("day-three", 16);
            renderForecast("day-four", 24);
            renderForecast("day-five", 32);
        
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Weather Map');
      });
  };

// If a user clicks a city from the search history, get current and future condiitions for that city  
function getWeatherFromHistory(event) {
  var element = event.target;
  if(element.matches('.btn-secondary')){
      searchField.value = element.textContent;   
      getCurrentWeather();
      getWeatherForecast();
  }
}

searchButton.addEventListener('click', getCurrentWeather);
searchButton.addEventListener('click', getWeatherForecast);
document.addEventListener('click', getWeatherFromHistory);
init();
