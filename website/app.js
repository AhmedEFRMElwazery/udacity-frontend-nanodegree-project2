/* Global Variables */
const APIKey_OpenWeatherMap ="3e179e5ed35ef0fc77b85ddb08634ffc&units=imperial";
const baseUrl_GeoAPI = "http://api.openweathermap.org/geo/1.0/";
const baseUrl_WeatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
const baseUrl_unSplash = "https://api.unsplash.com/";
const APIKey_unSplash ="_JCq6odAzhwUjfLC8OPJU0SMWazAbq0ql13miYtme08";
let body = document.querySelector('body');
let cityName = document.getElementById('city');
let zipCode = document.getElementById('zip');
let countryCode = document.getElementById('country');
let userFeelings = document.getElementById('feelings');
let historyListTitle = document.querySelector('.history-list-title');
let listTitleElement = document.querySelector('.list-titles');
let submitButton = document.getElementById('generate')
let historyList = document.querySelector('#entryHolder');




/**
 * DOM functions 
 */

const addNotification = (message)=>{
    let divElm = document.createElement('div');
    divElm.classList.add('notification');
    divElm.innerHTML=message;
    document.querySelector('body').appendChild(divElm);
}

const removeNotification = ()=>{
    let divElm = document.querySelector('.notification');
    document.querySelector('body').removeChild(divElm);
}

const addSearchHistoryListTitles =  ()=>{
    historyListTitle.textContent = "";
    listTitleElement.innerHTML="";

    
    historyListTitle.textContent = 'Most Recent Entries';
    listTitleElement.classList.add('list-titles-container');

    let cityNameSearched = document.createElement('div');
    cityNameSearched.classList.add('list-title');
    cityNameSearched.textContent= "City";

    let temperature = document.createElement('div');
    temperature.classList.add('list-title');
    temperature.textContent= "Temperature";

    let userFeeling = document.createElement('div');
    userFeeling.classList.add('list-title');
    userFeeling.textContent= "Feeling";

    let searchDate = document.createElement('div');
    searchDate.classList.add('list-title');
    searchDate.textContent= "Search Date";
    
    listTitleElement.appendChild(cityNameSearched);
    listTitleElement.appendChild(temperature);
    listTitleElement.appendChild(userFeeling);
    listTitleElement.appendChild(searchDate);
    }

const updateDOM = (arr)=>{

    addSearchHistoryListTitles();

    document.querySelector('html').style.background = `url('${arr[0].cityPhoto}&w=${body.clientWidth}&h=${body.clientHeight}') no-repeat center center fixed` ;
    document.querySelector('html').style.backgroundSize = "cover";
    document.querySelector('body').style.background = `rgba(0, 0, 0, 0.7)`;    
    
    arr.forEach( city => {
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');

        divElement.classList.add('expand');
        anchorElement.classList.add('flexible');

        const cityNameSearched = document.createElement('div');
        cityNameSearched.classList.add('HistorySubComponent');
        cityNameSearched.setAttribute('id', 'citySearched');
        cityNameSearched.innerHTML= `${city.cityName} (${city.countryCode})`;

        const searchDate = document.createElement('div');
        searchDate.classList.add('HistorySubComponent');
        searchDate.setAttribute('id', 'date');
        searchDate.innerHTML= `${city.searchDate} <br/> <em style="font-size: 11px;">Time ${city.searchTime}</em>`;

        const temperature = document.createElement('div');
        temperature.classList.add('HistorySubComponent');
        temperature.setAttribute('id', 'temp');
        temperature.innerHTML= `${city.temp}&#8457;`;

        const feelings = document.createElement('div');
        feelings.classList.add('HistorySubComponent');
        feelings.setAttribute('id', 'content');
        feelings.innerHTML= `${city.userFeelings}`;

        anchorElement.appendChild(cityNameSearched);
        anchorElement.appendChild(temperature);
        anchorElement.appendChild(feelings);
        anchorElement.appendChild(searchDate);

        anchorElement.addEventListener('click', (e)=>{
            e.preventDefault();
            document.querySelector('html').style.background = `url('${city.cityPhoto}&w=${body.clientWidth}&h=${body.clientHeight}') no-repeat center center fixed` ;
            document.querySelector('html').style.backgroundSize = "cover";
        
        });

        divElement.appendChild(anchorElement);
        historyList.appendChild(divElement);

        cityName.value = "";
        zipCode.value = "";
        countryCode.value = "";
        userFeelings.value = "";
    });
};

//API functions
const getCityGeoData = async (baseurl, apikey)=>{
    let finalURL ="";
    
    if(cityName.value !== "" && countryCode.value !==""){
        finalURL= `${baseurl}direct?q=${cityName.value},${countryCode.value}&appid=${apikey}`;
    } else if(zipCode.value !== "" && countryCode.value !==""){
        finalURL= `${baseurl}zip?zip=${zipCode.value},${countryCode.value}&appid=${apikey}`;
    } else if(cityName.value !== ""){
        finalURL= `${baseurl}direct?q=${cityName.value}&appid=${apikey}`;
    }

    let response = await fetch (finalURL);
        try{
            let retrievedGeoData = await response.json();
            if(retrievedGeoData.message === "not found" || Object.keys(retrievedGeoData).length === 0){
                addNotification("We have NOT found a city with the data you provided! <br/><br/> Please verify your input.");
                setTimeout(removeNotification, 5000);
            } else {
                return retrievedGeoData;
            }
        } catch(error){
            console.log(`Error from "getCityGeoData" function: ${error}`);
        }


};

const getCityWeatherData = async(resp, baseUrl, apikey) =>{
    // Create a new date instance dynamically with JS
    let d = new Date();
    /**
     * As the return value of the Month in the Date format is "0" index, 
     * +1 is added to the returned value to display the correct number equivalent
     * to the respective month.
     **/
    let newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();
    let newTime = d.getHours()+ ':'+ d.getMinutes() + ':'+ d.getSeconds();
    let finalURL;
    if(Array.isArray(resp)){
        finalURL = `${baseUrl}lat=${resp[0].lat}&lon=${resp[0].lon}&appid=${apikey}`;
    } else if(typeof resp === "object"){
        finalURL = `${baseUrl}lat=${resp.lat}&lon=${resp.lon}&appid=${apikey}`;
    };

    if(finalURL !== undefined){
        let retrievedData = await fetch(finalURL);
        let dataToBePostedToServer={};
        try{
            let retrievedWeatherData = await retrievedData.json();
            dataToBePostedToServer["temp"] = retrievedWeatherData.main.temp;
            dataToBePostedToServer["weatherDescription"] = retrievedWeatherData.weather[0].description;
            dataToBePostedToServer["coords"] = retrievedWeatherData.coord;
            dataToBePostedToServer["countryCode"] = retrievedWeatherData.sys.country;
            if(Array.isArray(resp)){
                dataToBePostedToServer["cityName"] = resp[0].name;
            } else if(typeof resp === "object"){
                dataToBePostedToServer["cityName"] = resp.name;
            };
            // dataToBePostedToServer["cityName"] = retrievedWeatherData.name;
            dataToBePostedToServer["cityId"] = retrievedWeatherData.id;
            let cityPhotos = await getCityPhoto(baseUrl_unSplash, APIKey_unSplash, retrievedWeatherData.name);
            dataToBePostedToServer["cityPhoto"] = cityPhotos.results[(Math.floor(Math.random()*cityPhotos.results.length))].urls.raw;
            dataToBePostedToServer["userFeelings"] = userFeelings.value;
            dataToBePostedToServer["searchDate"] = newDate;
            dataToBePostedToServer["searchTime"] = newTime;
            return dataToBePostedToServer;
        } catch(error){
            console.log(`Error from the "getCityWeatherData" function: ${error}`)
        }
    }
}

const getCityPhoto = async(baseUrl, apikey, cityName)=>{
    let finalUrl=`${baseUrl}search/photos?query=${cityName}&client_id=${apikey}`;

    let response = await fetch(finalUrl, {
        method: 'GET', 
        headers: {
            "Accept-Version": "v1"
        }
    });

    try{
        let retrievedPhotos = await response.json();
        return retrievedPhotos;
    }catch(error){
        console.log(`Error from the "getCityPhoto" function: ${error}`)
    }

}

const postDataToServer = async(url, data)=>{
    if(data !== undefined && data !== null){
        const response = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    
        try{
            const DataToBeSent = await response;
            return DataToBeSent;
        }catch(error){
            console.log(`Error from "postDataToServer" function: ${error}`);
        }
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
        return dataReceived;
    }catch(error){
        console.log(`Error from the "getDataFromServer" function: ${error}`);
    }
};




/**
 * Events
 */

submitButton.addEventListener('click', (e)=>{
    e.preventDefault();
    if(cityName.value === "" && zipCode.value === "" && countryCode.value === ""){
        addNotification("Please enter a valid City name and/or Zip code and/or Country");
        setTimeout(removeNotification, 5000);
    } else if (cityName.value === "" && zipCode.value === "" && countryCode.value !== ""){
        addNotification("Choosing a country from the list below requires <br/>naming a City OR adding a zipcode");
        setTimeout(removeNotification, 5000);
    } else if (zipCode.value !== "" && countryCode.value === ""){
        addNotification("Using the zipcode requires picking a country from the list below");
        setTimeout(removeNotification, 5000);
    }else if (!isNaN(cityName.value) && cityName.value !==""){
        addNotification("Please, enter a valid city name, not a number!");
        setTimeout(removeNotification, 5000);
    } else if (userFeelings.value === "" ){
        addNotification("Please, fill in the text area below");
        setTimeout(removeNotification, 5000);
    } else {
        historyList.innerHTML = "";
        getCityGeoData(baseUrl_GeoAPI, APIKey_OpenWeatherMap)
        .then(response => getCityWeatherData(response, baseUrl_WeatherAPI, APIKey_OpenWeatherMap))
        .then(res => postDataToServer('/addCitySearchData', res))
        .then(resp => getDataFromServer('/all'))
        .then(response => updateDOM(response));
    }
});

