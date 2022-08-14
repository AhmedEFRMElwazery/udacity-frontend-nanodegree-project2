/* Global Variables */
const APIKey ="6f1aa843d2mshe91d4071feb012dp1da4a1jsnaf2c682fade3"
const baseUrl = "https://weatherapi-com.p.rapidapi.com/forecast.json?q="
const forcastPeriod = "&days=3"
let cityName = document.getElementById('city');
let zipCode = document.getElementById('zip');
let userFeelings = document.getElementById('feelings');
let submitButton = document.getElementById('generate')
let historyList = document.querySelector('.entryHolder');

const currentLocation = navigator.geolocation.getCurrentPosition((data)=>{
    console.log(data.coords.latitude);
    console.log(data.coords.longitude);
});


// Create a new date instance dynamically with JS
let d = new Date();
/**
 * As the return value of the Month in the Date format is "0" index, 
 * +1 is added to the returned value to display the correct number equivalent
 * to the respective month.
 **/
let newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();


/**
 * DOM functions 
 */

const updateHistory = (arr)=>{
    arr.forEach( city => {
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');
        anchorElement.classList.add('flexible');

        const cityNameSearched = document.createElement('div');
        cityNameSearched.classList.add('HistorySubComponent');
        cityNameSearched.setAttribute('id', 'citySearched');
        cityNameSearched.innerHTML= city.location.name;

        const searchDate = document.createElement('div');
        searchDate.classList.add('HistorySubComponent');
        searchDate.setAttribute('id', 'date');
        searchDate.innerHTML= city.searchDate;

        const temperature = document.createElement('div');
        temperature.classList.add('HistorySubComponent');
        temperature.setAttribute('id', 'temp');
        temperature.innerHTML= `${city.current.temp_c}&#8451;`;

        const feelings = document.createElement('div');
        feelings.classList.add('HistorySubComponent');
        feelings.setAttribute('id', 'content');
        feelings.innerHTML= `<img src="${city.current.condition.icon}" title="${cityItem.current.condition.text} weather" alt="weather condition: ${cityItem.current.condition.text}">`;

        anchorElement.appendChild(cityNameSearched);
        anchorElement.appendChild(temperature);
        anchorElement.appendChild(feelings);
        anchorElement.appendChild(searchDate);

        divElement.appendChild(anchorElement);
        historyList.appendChild(divElement);
    });
};

//API functions
const getCityForcastData = async (baseurl, cityName, forcastPeriod, apikey)=>{
    finalURL= baseurl+cityName+forcastPeriod;
    let response = await fetch (finalURL, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apikey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    });
    try{
        let receivedWeatherData = await response;
        // receivedWeatherData['searchDate'] = newDate;
        let finalReceivedWeatherData = await receivedWeatherData.json();
        finalReceivedWeatherData["searchDate"] = newDate;
        console.log(finalReceivedWeatherData.location.country)
        console.log(finalReceivedWeatherData.location.lat)
        console.log(finalReceivedWeatherData.location.lon)
        console.log(finalReceivedWeatherData.location.localtime.split(" "));
        await console.log(finalReceivedWeatherData)
        await console.log(typeof finalReceivedWeatherData)
        return finalReceivedWeatherData;
    } catch(error){
        console.log(error);
        // if(error.Object.message === "No matching location found."){
        //     console.log(`There is no city with the name ${cityName}! Please enter the city's name correctly...`)

        // } else {
        // console.log(`error message: ${error}`);
        // }
    }
};

const postDataToServer = async(url="", data={})=>{
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    try{
        // const DataToBeSent = await response.json();
        const DataToBeSent = await response;
        return DataToBeSent;
    }catch(error){
        console.log(`Error from "postDataToServer" function: ${error}`);
    }
};

const getDataFromServer = async(url)=>{
    const request = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json"
        }
    });
    try{
        const dataReceived = await request.json();
        console.log(dataReceived)
        return dataReceived;
    }catch(error){
        console.log(`Error from the "getDataFromServer" function: ${error}`);
    }
};




/**
 * Events
 */


submitButton.addEventListener('click', (e)=>{
    // e.preventDefault();
    historyList.innerHTML = "";
    getCityForcastData(baseUrl, cityName.value, forcastPeriod, APIKey)
    .then(res => postDataToServer('/addHistory', res))
    .then(resp => getDataFromServer('/all'))
    .then(response => {updateHistory(response), greatMap(response)});
});

