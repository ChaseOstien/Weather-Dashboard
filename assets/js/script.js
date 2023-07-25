
var citySubmit = document.getElementById('submit');
var history = document.getElementById('history');
var historyButton = document.getElementById('history1');
var currentDay = document.getElementById('current-day');
var forecast = document.getElementById('forecast');
var card1 = document.getElementById('card1');
var card2 = document.getElementById('card2');
var card3 = document.getElementById('card3');
var card4 = document.getElementById('card4');
var card5 = document.getElementById('card5');
var cards = document.getElementsByClassName('card-body');
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

    currentDay.innerHTML = '';

    var forecastData = [];

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            var cityName = document.createElement('h2');
            var temp = document.createElement('h5');
            var wind = document.createElement('h5');
            var humidity = document.createElement('h5');


            cityName.textContent = cityInput + ' (' + todayFormatted + ')';
            temp.textContent = 'Temp: ' + data.list[0].main.temp + '\u00B0' + 'F';
            wind.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH';
            humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + ' %';

            
            currentDay.append(cityName);
            currentDay.append(temp);
            currentDay.append(wind);
            currentDay.append(humidity);

            saveData({
                cityName: cityName.textContent,
                temp: temp.textContent,
                wind: wind.textContent,
                humidity: humidity.textContent,
            });

            return data;
        })

        .then(function (data) {
            console.log(data);
            
            var nextDay = today.add(1, 'day')

            for (var i = 0; i < cards.length; i++) {
                var futureDate = cards[i].getElementsByClassName('futureDate')[0];
                var futureTemp = cards[i].getElementsByClassName('future-temp')[0];
                var futureWind = cards[i].getElementsByClassName('future-wind')[0];
                var futureHumidity = cards[i].getElementsByClassName('future-humidity')[0];

                futureDate.textContent = nextDay.format('MM/DD/YYYY');
                futureTemp.textContent = 'Temp: ' + data.list[i * 8].main.temp + '\u00B0' + 'F';
                futureWind.textContent = 'Wind: ' + data.list[i * 8].wind.speed + ' MPH';
                futureHumidity.textContent = 'Humidity: ' + data.list[i * 8].main.humidity + ' %';
                
                cards[i].append(futureDate);
                cards[i].append(futureTemp);
                cards[i].append(futureWind);
                cards[i].append(futureHumidity);

                nextDay = nextDay.add(1, 'day');

                var forecastItem = {
                futureDate: futureDate.textContent,
                futureTemp: futureTemp.textContent,
                futureWind: futureWind.textContent,
                button: historyButton.textContent
                };

                forecastData.push(forecastItem)

            }
            saveData2(forecastData);
            return data[i];
    })

        .catch(error => {
            console.error('Error fetching data:', error);
        });


        var today = dayjs();
        
        var todayFormatted = dayjs().format('MM/DD/YYYY');
}



function loadData (data) {
    const savedData = localStorage.getItem('Weatherdata');
    const savedData2 = localStorage.getItem('Weatherdata2')

    
    if (savedData) {
        const data = JSON.parse(savedData);

        currentDay.innerHTML = '';
        var cityName = document.createElement('h2');
        var temp = document.createElement('h5');
        var wind = document.createElement('h5');
        var humidity = document.createElement('h5');

        cityName.textContent = data.cityName;
        temp.textContent = data.temp;
        wind.textContent = data.wind;
        humidity.textContent = data.humidity;

        currentDay.append(cityName);
        currentDay.append(temp);
        currentDay.append(wind);
        currentDay.append(humidity);
    }

    if (savedData2) {
        data = JSON.parse(savedData2);

        //forecast.innerHTML = '';
        for ()
                var futureDate = cards[i].getElementsByClassName('futureDate')[0];
                var futureTemp = cards[i].getElementsByClassName('future-temp')[0];
                var futureWind = cards[i].getElementsByClassName('future-wind')[0];
                var futureHumidity = cards[i].getElementsByClassName('future-humidity')[0];

                futureDate.textContent = data.futureDate;
                futureTemp.textContent = data.futureTemp;
                futureWind.textContent = data.futureWind;
                futureHumidity.textContent = data.futureHumidity;

                cards[i].append(futureDate);
                cards[i].append(futureTemp);
                cards[i].append(futureWind);
                cards[i].append(futureHumidity);
        

    }
}


function saveData (data) {
    localStorage.setItem('Weatherdata', JSON.stringify(data));
    var city = document.getElementById('city-Input').value;
    historyButton.textContent = city;

}

function saveData2 (data) {
    localStorage.setItem('Weatherdata2', JSON.stringify(data));

}


citySubmit.addEventListener('click', weatherApi);
historyButton.addEventListener('click', loadData);


    //$('#currentDay').text(today.format('MM/DD/YYYY'));
    //data.list[0].dt_txt