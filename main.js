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
        
    }

    async function getWeatherData(location) {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${KEY}&include=days&unitGroup=metric`);
        const responseData = await response.json();

        let locationAddress = responseData.resolvedAddress;
        let locationName = responseData.address;
        let days = responseData.days;

        return {
            locationAddress,
            locationName,
            days,
        }
    }

})()