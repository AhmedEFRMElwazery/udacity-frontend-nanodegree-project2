# Udacity Frontend Nanodegree - Project 2 (Weather App journal)


[![Udacity's Logo](./website/imgs/udacityLogo.svg "Udacity's Logo")](https://www.udacity.com/)



## sponsored and funded by [egFWD](https://egfwd.com/) 

[![egFWD - Future of Work is Digital](./website/imgs/Egypt_fwd_logo-1.png "egFWD - Future of Work is Digital")](https://egfwd.com/specializtion/web-development-professional/)



*author*: **Ahmed E. F. R. Mohammed**


* [Features](#Features)
* [Testing](#Testing)
* [Proper-use](#Proper-use)
* [Task-Status-and-Completion](#Tasks-Status-and-Completion)

## Features

* Complete redesign of the landing page.

![Landing Page](./website/imgs/documenation/landingPage.png "a completely new design for the landing page")



* **Responsive Design**: The App is adaptive to different sizes of screens.

![A demo on the app responsive design](./website/imgs/documenation/ResponsiveDesign.gif "A demo on the app responsive design")



* **User Interactivity 1**: The App background changes once the user clicks on a select item in the search history list.

![User click changes the app background](./website/imgs/documenation/BackgroundChangeOnClick.gif "User clicks on the search history list items changes the app background")



* **User Interactivity 2**: Upon clicking an item in the search history list, the user gets extra weather for the day, namely **max temperature, min temperature, humidity, wind speed, and the general weather condition for the day, as provided by the API icon**.

![User click gets extra weather info](./website/imgs/documenation/ToggleExtraWeatherInformation.gif "Upon clicking an item in the search history list, the user gets extra weather for the day")



* **Error notifications** to guide the user on how to properly use the Weather Journal App (as seen in the "Testing" section below)

![A demo on error notification functionality](./website/imgs/documenation/ErrorNotifications.gif "A demo on error notification functionality")



## Testing

* Error resulting from the user entering a number in the City name input.

![Error1](./website/imgs/documenation/error-enter-valid-city-name.png "Error notification to guide the user-app navigation")



* Error resulting from the user entering a zipcode ONLY without picking a country from the dropdown list.

![Error2](./website/imgs/documenation/error-entering-zipcode-only.png "Error notification to guide the user-app navigation")



* Error resulting from the user choosing a country from the dropdown list, WITHOUT naming a city or entering a zipcode.

![Error3](./website/imgs/documenation/error-entering-country-only.png "Error notification to guide the user-app navigation")



* Error resulting from the user leaving the "text area", and not entering how he feels.

![Error4](./website/imgs/documenation/error-not-entering-feeling.png "Error notification to guide the user-app navigation")



* Error resulting from random entries by the user, such as naming a random city in a country.

![Error5](./website/imgs/documenation/error-random-city-country.png "Error notification to guide the user-app navigation")



## Proper-use

**In all the following cases, the entry in the text area is required for the app to function properly**

* The User can enter **a city name and a country** to conduct a search

![ProperUse1](./website/imgs/documenation/proper-use-city-country.png "A demo on how to properly use the app")

![ProperUse2](./website/imgs/documenation/proper-use-city-country-res.png "A demo on how to properly use the app")



* The User can enter **a city name ONLY** to conduct a search

![ProperUse3](./website/imgs/documenation/proper-use-city-only.png "A demo on how to properly use the app")



* The User can enter **a zipcode and a country** to conduct a search

![ProperUse4](./website/imgs/documenation/proper-use-zipcode-country.png "A demo on how to properly use the app")



## Tasks-Status-and-Completion

| Category                  |                   Feature                         |   Condition  |     Status             |
|---------------------------|---------------------------------------------------|--------------|------------------------|
| Project Environment Setup |  Node and Express Environment                     |   required   |  :heavy_check_mark:    |
|                           |  Project Dependencies                             |   required   |  :heavy_check_mark:    |
|                           |  Local Server                                     |   required   |  :heavy_check_mark:    |
|                           |  API Credentials                                  |   required   |  :heavy_check_mark:    |
| APIs and Routes           |  APP API Endpoint                                 |   required   |  :heavy_check_mark:    |
|                           |  Integrating OpenWeatherMap API                   |   required   |  :heavy_check_mark:    |
|                           |  Return Endpoint Data (GET Route I: Server Side)  |   required   |  :heavy_check_mark:    |
|                           |  Return Endpoint Data (GET Route II: Client Side) |   required   |  :heavy_check_mark:    |
|                           |  POST Route                                       |   required   |  :heavy_check_mark:    |
| Dynamic UI                |  Naming HTML Inputs and Buttons For Interaction   |   required   |  :heavy_check_mark:    |
|                           |  Assigning Element Properties Dynamically         |   required   |  :heavy_check_mark:    |
|                           |  Event Listeners                                  |   required   |  :heavy_check_mark:    |
|                           |  Dynamically Update UI                            |   required   |  :heavy_check_mark:    |
| Student-Own initiative    |  Integrated an extra APIs (for photo search)      |   Extra      |  :heavy_check_mark:    |
|                           |  Entirely Updated The UI Design                   |   Extra      |  :heavy_check_mark:    |
|                           |  Applying Responsive Design                       |   Extra      |  :heavy_check_mark:    |
|                           |  Error Notification to Guide the User             |   Extra      |  :heavy_check_mark:    |
|                           |  App Interactivity (Image Change On User Click)   |   Extra      |  :heavy_check_mark:    |
|                           |  App Interactivity (Extra Weather Info On Click)  |   Extra      |  :heavy_check_mark:    |
