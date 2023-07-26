
var citySubmit = document.getElementById('submit');
var history1 = document.getElementById('history-button');
var clearButton = document.getElementById('clear1');
var currentDay = document.getElementById('current-day');
var historyButton;
var forecast = document.getElementById('forecast');
var card1 = document.getElementById('card1');
var card2 = document.getElementById('card2');
var card3 = document.getElementById('card3');
var card4 = document.getElementById('card4');
var card5 = document.getElementById('card5');
var cards = document.getElementsByClassName('card-body');
var cityName;
var temp;
var wind;
var humidity;
var futureDate;
var futureTemp;
var futureWind;
var futureHumidity;
var locationIcon;
var futureIcon;
var iconCode;
var locationUrl;




async function weatherApi() {
    var requestUrl = new URL('https://api.openweathermap.org/data/2.5/forecast?q=Austin&appid=efb38696a265649fff46253fba091247&units=imperial');

    var cityInput = document.getElementById('city-Input').value;
    
    var search_Params = requestUrl.searchParams;
    search_Params.set('q', cityInput);

    if (cityInput === '') {
        alert('Enter a US City!');
    }

    
    currentDay.innerHTML = '';

    var forecastData = [];

try {
    const response = await fetch(requestUrl)
        const data = await response.json();

        
            console.log(data);
            cityName = document.createElement('h2');
            temp = document.createElement('h5');
            wind = document.createElement('h5');
            humidity = document.createElement('h5');
            locationIcon = document.createElement('img');
            iconCode = data.list[0].weather[0].icon;
            locationUrl = "./assets/img/" + iconCode + ".png";
            var today = dayjs();
            var todayFormatted = dayjs().format('MM/DD/YYYY');


            cityName.textContent = cityInput + ' (' + todayFormatted + ')';
            temp.textContent = 'Temp: ' + data.list[0].main.temp + '\u00B0' + 'F';
            wind.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH';
            humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + ' %';
            locationIcon.src = locationUrl;
            locationIcon.setAttribute('id', 'currentIcon');
            

            
            currentDay.append(cityName);
            currentDay.append(locationIcon);
            currentDay.append(temp);
            currentDay.append(wind);
            currentDay.append(humidity);

            var forecastItem1 = {
                cityName: cityName.textContent,
                locationIcon: locationIcon.src,
                temp: temp.textContent,
                wind: wind.textContent,
                humidity: humidity.textContent,
            };

            

            forecastData.push(forecastItem1);
            saveData(cityInput, forecastData);

            var nextDay = today.add(1, 'day')

            for (var i = 0; i < cards.length; i++) {
                futureDate = cards[i].getElementsByClassName('futureDate')[0];
                futureIcon = cards[i].getElementsByClassName('futureIcon')[0];
                futureTemp = cards[i].getElementsByClassName('future-temp')[0];
                futureWind = cards[i].getElementsByClassName('future-wind')[0];
                futureHumidity = cards[i].getElementsByClassName('future-humidity')[0];
                var futureIconCode = data.list[i * 8].weather[0].icon;
                var futureUrl = "./assets/img/" + futureIconCode + ".png"; 

                futureDate.textContent = nextDay.format('MM/DD/YYYY');
                futureIcon.src = futureUrl;
                futureIcon.height = 40;
                futureIcon.width = 60;
                futureTemp.textContent = 'Temp: ' + data.list[i * 8].main.temp + '\u00B0' + 'F';
                futureWind.textContent = 'Wind: ' + data.list[i * 8].wind.speed + ' MPH';
                futureHumidity.textContent = 'Humidity: ' + data.list[i * 8].main.humidity + ' %';
                
                cards[i].append(futureDate);
                cards[i].append(futureIcon);
                cards[i].append(futureTemp);
                cards[i].append(futureWind);
                cards[i].append(futureHumidity);

                nextDay = nextDay.add(1, 'day');

                var forecastItem2 = {
                futureDate: futureDate.textContent,
                futureIcon: futureIcon.src,
                futureTemp: futureTemp.textContent,
                futureWind: futureWind.textContent,
                futureHumidity: futureHumidity.textContent
                };

                

                forecastData.push(forecastItem2)
                saveData(cityInput, forecastData);
            }

            /*setTimeout(function () {
                loadData(cityInput);
            }, 100);*/
}   catch(error) {
            console.error('Error fetching data:', error);
        };
        

        historyButton = document.createElement('button');
        historyButton.textContent = cityInput;
        historyButton.classList.add('btn', 'btn-secondary', 'mb-2');
        history1.appendChild(historyButton);
        historyButton.addEventListener('click', async function () {
            loadData(cityInput);
        });
        
}






function loadData (cityInput) {
    const savedData = JSON.parse(localStorage.getItem('Weatherdata'));
    
    if (savedData && savedData[cityInput]) {
        const cityData = (savedData[cityInput]);

        currentDay.innerHTML = '';
        cityName = document.createElement('h2');
        locationIcon = document.createElement('img')
        locationIcon.setAttribute('id', 'currentIcon');
        temp = document.createElement('h5');
        wind = document.createElement('h5');
        humidity = document.createElement('h5');

        cityName.textContent = cityData.data[0].cityName;
        locationIcon.src = cityData.data[0].locationIcon;
        temp.textContent = cityData.data[0].temp;
        wind.textContent = cityData.data[0].wind;
        humidity.textContent = cityData.data[0].humidity;

        currentDay.append(cityName);
        currentDay.append(locationIcon);
        currentDay.append(temp);
        currentDay.append(wind);
        currentDay.append(humidity);
    

        for (var i = 0; i < cards.length; i++) {
                var futureDate = cards[i].getElementsByClassName('futureDate')[0];
                var futureIcon = cards[i].getElementsByClassName('futureIcon')[0];
                var futureTemp = cards[i].getElementsByClassName('future-temp')[0];
                var futureWind = cards[i].getElementsByClassName('future-wind')[0];
                var futureHumidity = cards[i].getElementsByClassName('future-humidity')[0];

                futureDate.textContent = cityData.data[i + 1].futureDate;
                futureIcon.src = cityData.data[i + 1].futureIcon;
                futureIcon.height = 40;
                futureIcon.width = 60;
                futureTemp.textContent = cityData.data[i + 1].futureTemp;
                futureWind.textContent = cityData.data[i + 1].futureWind;
                futureHumidity.textContent = cityData.data[i + 1].futureHumidity;
                

                cards[i].append(futureDate);
                cards[i].append(futureIcon);
                cards[i].append(futureTemp);
                cards[i].append(futureWind);
                cards[i].append(futureHumidity);
                
        
            }
        } else {
            console.log('Data not found.');
        }

        

    }


function saveData (cityInput, data) {
    const savedData = JSON.parse(localStorage.getItem('Weatherdata')) || {};
    savedData[cityInput] = { cityName: cityInput, data: data };
    localStorage.setItem('Weatherdata', JSON.stringify(savedData));
    

}

function saveData2 (data) {
    localStorage.setItem('Weatherdata2', JSON.stringify(data));

}

citySubmit.addEventListener('click', weatherApi);