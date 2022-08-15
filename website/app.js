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

const updateDOM = (obj)=>{

    addSearchHistoryListTitles();

    let objKeyPos = `${Object.keys(obj).length-1}`;

    document.querySelector('html').style.background = `url('${obj[objKeyPos].cityPhoto}&w=${body.clientWidth}&h=${body.clientHeight}') no-repeat center center fixed` ;
    document.querySelector('html').style.backgroundSize = "cover";
    document.querySelector('body').style.background = `rgba(0, 0, 0, 0.7)`;    
    
    for(let i=Object.keys(obj).length-1; i>=0; i--){
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');

        divElement.classList.add('cityDataContainer');
        anchorElement.classList.add('flexible');

        const cityNameSearched = createSubComponent_partial('div', 'HistorySubComponent', 'citySearched');
        cityNameSearched.innerHTML= `${obj[i].cityName} (${obj[i].countryCode})`;


        const searchDate = createSubComponent_partial('div', 'HistorySubComponent', 'date');
        searchDate.innerHTML= `${obj[i].searchDate} <br/> <em style="font-size: 11px;">Time ${obj[i].searchTime}</em>`;


        const temperature = createSubComponent_partial('div', 'HistorySubComponent', 'temp')
        temperature.innerHTML= `${obj[i].temp}&#8457;`;

        const feelings = createSubComponent_full(obj[i], 'userFeelings', 'div', 'HistorySubComponent', 'userFeelings')

        anchorElement.appendChild(cityNameSearched);
        anchorElement.appendChild(temperature);
        anchorElement.appendChild(feelings);
        anchorElement.appendChild(searchDate);

        const extraInfoElement = document.createElement('div');
        extraInfoElement.classList.add('extra-info');

        const maxTemp = extraInfoSubComponent(obj[i], 'temp_max', 'div', 'extraInforSubComponent', 'Maxiumm Temperature', './imgs/icons/max-temperature.png', '&#8457;');
        const minTemp = extraInfoSubComponent(obj[i], 'temp_min', 'div', 'extraInforSubComponent', 'Minimum Temperature', './imgs/icons/min-temperature.png', '&#8457;');
        const weatherCondition = extraInfoSubComponent(obj[i], 'weatherDescription', 'div', 'extraInforSubComponent', 'General Weather Condition', obj[i].weatherIcon);
        const humidity = extraInfoSubComponent(obj[i], 'humidity', 'div', 'extraInforSubComponent', 'Humidity', './imgs/icons/humidity.png', '&#37;');
        const windSpeed = extraInfoSubComponent(obj[i], 'windSpeed', 'div', 'extraInforSubComponent', 'Wind Speed', './imgs/icons/windspeed.png', 'm&#47;s');

        extraInfoElement.appendChild(maxTemp);
        extraInfoElement.appendChild(minTemp);
        extraInfoElement.appendChild(humidity);
        extraInfoElement.appendChild(windSpeed);
        extraInfoElement.appendChild(weatherCondition);

        divElement.appendChild(anchorElement);

        divElement.addEventListener('click', (e)=>{
            e.preventDefault();
            document.querySelector('html').style.background = `url('${obj[i].cityPhoto}&w=${body.clientWidth}&h=${body.clientHeight}') no-repeat center center fixed` ;
            document.querySelector('html').style.backgroundSize = "cover";
            let extraContent = divElement.nextElementSibling;
            if (extraContent.style.maxHeight){
                extraContent.style.maxHeight = null;
            } else {
                extraContent.style.maxHeight = extraContent.scrollHeight + 60 +"px";
            }
            
        });

        
        historyList.appendChild(divElement);
        historyList.appendChild(extraInfoElement);

        cityName.value = "";
        zipCode.value = "";
        countryCode.value = "";
        userFeelings.value = "";
    }
};

const createSubComponent_partial = (elemType, className, id)=>{
    const subComponent = document.createElement(elemType);
        subComponent.classList.add(className);
        subComponent.setAttribute('id', id);
        return subComponent
}

const createSubComponent_full = (obj, propertyName, elemType, className, id, message="")=>{
    const subComponent = document.createElement(elemType);
    subComponent.classList.add(className);
    subComponent.setAttribute('id', id);
    subComponent.innerHTML = `${message}${obj[propertyName]}`;
    return subComponent;
}

const extraInfoSubComponent = (obj, propertyName, elemType, className, title, icon, unit="")=>{
    const extraSubComponent = document.createElement(elemType);
    extraSubComponent.classList.add(className);
    extraSubComponent.innerHTML = `<img src='${icon}' title='${title}'> <span>${obj[propertyName]} ${unit}</span>`;
    return extraSubComponent;

}

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
            dataToBePostedToServer["temp_max"] = retrievedWeatherData.main.temp_max;
            dataToBePostedToServer["temp_min"] = retrievedWeatherData.main.temp_min;
            dataToBePostedToServer["humidity"] = retrievedWeatherData.main.humidity;
            dataToBePostedToServer["windSpeed"] = retrievedWeatherData.wind.speed;
            dataToBePostedToServer["weatherIcon"] = `http://openweathermap.org/img/wn/${retrievedWeatherData.weather[0].icon}@2x.png`;
            dataToBePostedToServer["weatherDescription"] = retrievedWeatherData.weather[0].description;
            dataToBePostedToServer["coords"] = retrievedWeatherData.coord;
            dataToBePostedToServer["countryCode"] = retrievedWeatherData.sys.country;
            if(Array.isArray(resp)){
                dataToBePostedToServer["cityName"] = resp[0].name;
            } else if(typeof resp === "object"){
                dataToBePostedToServer["cityName"] = resp.name;
            };
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

