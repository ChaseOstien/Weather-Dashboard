
var citySubmit = document.getElementById('submit');
var history = document.getElementById('history');
var historyButton = document.getElementById('history-button');
var currentDay = document.getElementById('current-day');
var forecast = document.getElementById('forecast');
var card1 = document.getElementById('card1');
var card2 = document.getElementById('card2');
var card3 = document.getElementById('card3');
var card4 = document.getElementById('card4');
var card5 = document.getElementById('card5');

/*cityInput.addEventListener('input', function() {
    var inputText = cityInput.value;
    console.log(inputText);
});*/

function weatherApi() {
    var requestUrl = new URL('https://api.openweathermap.org/data/2.5/forecast?q=Austin&appid=efb38696a265649fff46253fba091247&units=imperial');

    var cityInput = document.getElementById('city-Input').value;

    var search_Params = requestUrl.searchParams;
    search_Params.set('q', cityInput);

    if (cityInput === '') {
        alert('Enter a US City!');
    }

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var cityName = document.createElement('h3');
            var temp = document.createElement('p');
            var wind = document.createElement('p');
            var humidity = document.createElement('p');


            cityName.textContent = cityInput + ' (' + today.format('MM/DD/YYYY') + ')';
            temp.textContent = 'Temp: ' + data.list[0].main.temp + '\u00B0' + 'F';
            wind.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH';
            humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + ' %';

            
            
            currentDay.append(cityName);
            currentDay.append(temp);
            currentDay.append(wind);
            currentDay.append(humidity);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        var today = dayjs();
}

citySubmit.addEventListener('click', weatherApi);


    //$('#currentDay').text(today.format('MM/DD/YYYY'));
    //data.list[0].dt_txt