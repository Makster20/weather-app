// IIFE - Immediately Invoked Function Expressions
// Uses namespaces but also lets you control access

const APP = (function() {
    document.addEventListener('DOMContentLoaded', init);

    const KEY = 'FMJQ98AUZQSGKSDV9XXF8DJE8';

    async function init(){
        let weatherData = await getWeatherData('dubai');
        console.log(weatherData.locationAddress);
        console.log(weatherData.locationName);
        console.log(weatherData.days);

        addListeners()
        
    }

    async function getWeatherData(location) {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${KEY}&include=days&unitGroup=metric`);
        const responseData = await response.json();

        let locationAddress = responseData.resolvedAddress;
        let locationName = responseData.address;
        let days = responseData.days;
        let tempurature = responseData['days'][0].temp;
        let wind = responseData['days'][0].windspeed;
        let feelslike = responseData['days'][0].feelslike;
        let humidity = responseData['days'][0].humidity;
        let conditions = responseData['days'][0].conditions;

        let upcomingDays = [
            [responseData['days'][1].temp, responseData['days'][1].conditions],
            [responseData['days'][2].temp, responseData['days'][2].conditions],
            [responseData['days'][3].temp, responseData['days'][3].conditions],
            [responseData['days'][4].temp, responseData['days'][4].conditions],
            [responseData['days'][5].temp, responseData['days'][5].conditions],
        ]

        console.log(responseData)

        return {
            locationAddress,
            locationName,
            days,
            tempurature,
            wind,
            feelslike,
            humidity,
            conditions,
            upcomingDays
        }
    }

    function addListeners(){
        const searchBar = document.querySelector('input');
        const searchIcon = document.querySelector('svg');
        let searchValue;
        searchIcon.addEventListener('click', async () => {
            searchValue = searchBar.value;
            let responseData = await getWeatherData(searchValue)
            console.log(responseData)
            changeMainForecast(responseData.locationAddress, responseData.tempurature, responseData.wind, responseData.feelslike, responseData.humidity, responseData.conditions)
            changeUpcomingDays(responseData.upcomingDays)
            changeAppearance(responseData.tempurature)
        })

    }

    function changeAppearance(tempurature){
        const body = document.querySelector('body');
        // Ensure Tailwind generates the classes by referencing them somewhere in the code
        if (tempurature < 30) {
            body.classList.remove('from-blue-400', 'to-blue-800');
            body.classList.add('from-red-400', 'to-red-800');
        } else {
            body.classList.remove('from-red-400', 'to-red-800');
            body.classList.add('from-blue-400', 'to-blue-800');
        }
    }

    function changeMainForecast(locationAddress, tempurature, wind, feelslike, humidity, conditions){
        console.log(conditions)
        const mainImg = document.querySelector('#main-img')
        const locationAddressDOM = document.querySelector('#location-address')
        const tempuratureDOM = document.querySelector('#tempurature')
        const windDOM = document.querySelector('#wind')
        const feelslikeDOM = document.querySelector('#feelslike')
        const humidityDOM = document.querySelector('#humidity')
        const conditionsDOM = document.querySelector('#conditions')

        locationAddressDOM.innerText = locationAddress;
        tempuratureDOM.innerText = `${Math.round(tempurature)}°C`;
        windDOM.innerText = `${Math.round(wind)} KPH`;
        feelslikeDOM.innerText = `${Math.round(feelslike)}°C`;
        humidityDOM.innerText = `${Math.round(humidity)}%`;
        conditionsDOM.innerText = conditions;

        if (conditions.toLowerCase().includes('cloud')) {
            mainImg.src = 'imgs/cloudy-day.png';
        } else if (conditions.toLowerCase().includes('light')) {
            mainImg.src = 'imgs/lighting.png';
        } else if (conditions.toLowerCase().includes('rain')) {
            mainImg.src = 'imgs/raining.png';
        } else if (conditions.toLowerCase().includes('snow')) {
            mainImg.src = 'imgs/snowy.png';
        } else if (conditions.toLowerCase().includes('sunny') || conditions.toLowerCase().includes('clear')) {
            mainImg.src = 'imgs/sunny.png';
        }
    }

    function changeUpcomingDays(upcomingDays){
        const day1Img = document.querySelector('#day1 img')
        const day1Tempurature = document.querySelector('#day1 span')
        const day2Img = document.querySelector('#day2 img')
        const day2Tempurature = document.querySelector('#day2 span')
        const day3Img = document.querySelector('#day3 img')
        const day3Tempurature = document.querySelector('#day3 span')
        const day4Img = document.querySelector('#day4 img')
        const day4Tempurature = document.querySelector('#day4 span')
        const day5Img = document.querySelector('#day5 img')
        const day5Tempurature = document.querySelector('#day5 span')

        const imgsList = [day1Img, day2Img, day3Img, day4Img, day5Img]
        const tempsList = [day1Tempurature, day2Tempurature, day3Tempurature, day4Tempurature, day5Tempurature]

        for (let i = 0; i < imgsList.length; i++) {
            console.log(imgsList[i])

            if (upcomingDays[i][1].toLowerCase().includes('cloud')) {
                imgsList[i].src = 'imgs/cloudy-day.png';
            } else if (upcomingDays[i][1].toLowerCase().includes('light')) {
                imgsList[i].src = 'imgs/lighting.png';
            } else if (upcomingDays[i][1].toLowerCase().includes('rain')) {
                imgsList[i].src = 'imgs/raining.png';
            } else if (upcomingDays[i][1].toLowerCase().includes('snow')) {
                imgsList[i].src = 'imgs/snowy.png';
            } else if (upcomingDays[i][1].toLowerCase().includes('sunny') || upcomingDays[i][1].toLowerCase().includes('clear')) {
                imgsList[i].src = 'imgs/sunny.png';
            }
            
        }

        for (let i = 0; i < tempsList.length; i++) {
            tempsList[i].innerText = `${Math.round(upcomingDays[i][0])}°C`;
        }
        console.log('hihihih');
        
    }

})()