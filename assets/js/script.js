var searchField = document.getElementById("search-field")
var searchButton = document.getElementById("search-btn")

var APIKey = "f31f098d0ca4ea130ecb62f6ef16acc8";
var lat;
var long;

var getCurrentWeather = function (user) {
    var city = searchField.value.trim();
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey
    console.log(apiUrl)
  
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

var getWeatherForecast = function (user) {
    var city = searchField.value.trim();
    // var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey

  
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
