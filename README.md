# Udacity Frontend Nanodegree - Project 2 (Weather App journal)


[![Udacity's Logo](./website/imgs/udacityLogo.svg)](https://www.udacity.com/)



## sponsored and funded by [egFWD](https://egfwd.com/) 

[![egFWD - Future of Work is Digital](./website/imgs/Egypt_fwd_logo-1.png)](https://egfwd.com/)



*author*: **Ahmed E. F. R. Mohammed**


* [Instructions](#instructions)
* [Features](#limitations)
* [Task Status and Completion](#Tasks-Status-and-Completion)

## Instructions

This project started as a weather app journel, as specified and stated in the project ruberic of Task 2 in the front-end web development Udacity NanoDegree.

However, ever since I discovered the power of APIs, and the wealth of data and information that they offer, I grew ever more greedy with the project. 

I also decided to take advantage of the initiative by Udacity (i.e. to innovate and come up with one's own ideas) that was offered to us during project one (landing page), and I wasn't able to  do so due to the lack of time. Therefore, I decided to go all-in on it for this project.

**Unfortunately, my first submission was rejected due to the fact that I overlooked some functionality with the original requirements. Therefore, I decided to scrap the whole thing, and start over**

**Kindly note that all the project requirements as stipulated by Udacity's ruberic has been fulfilled nontheless, and they were integrated, one way or another, to serve the purpose of my app.**

I belive the project now is more of a weather-oriented travel planner, in which the user get to search weather data, and at the same time gets information on available flights from his city to the city (destination) he searched using the **"Awesome Vacation" App**. Yep, that's what I am calling it right now. :laughing:

## Features

* Complete redesign of the landing page.
[Landing Page](./website/imgs/documenation/landingPage.png)

* Responsive Design: The App is adaptive to different sizes of screens.
[A Demo on the app responsive design](./website/imgs/documenation/ResponsiveDesign.gif)

* User Interactivity: The App background changes once the user clicks on a select item in the search history list.
[User click changes the app background](./website/imgs/documenation/BackgroundChangeOnClick.gif)

* Error notification to guide the user on how to properly use the Weather Journal App (as seen in the "Testing" section below)
[A demo on error notification functionality](./website/imgs/documenation/ErrorNotifications.gif)


## Testing

* Error resulting from the user entering a number in the City name input.
[Error1](./website/imgs/documenation/error-enter-valid-city-name.png)

* Error resulting from the user entering a zipcode ONLY without picking a country from the dropdown list.
[Error2](./website/imgs/documenation/error-entering-zipcode-only.png)

* Error resulting from the user choosing a country from the dropdown list, WITHOUT naming a city or entering a zipcode.
[Error3](./website/imgs/documenation/error-entering-country-only.png)

* Error resulting from the user leaving the "text area", and not entering how he feels.
[Error4](./website/imgs/documenation/error-not-entering-feeling.png)

* Error resulting from random entries by the user, such as naming a random city in a country.
[Error5](./website/imgs/documenation/error-random-city-country.png)

## Proper-use

**In all the following cases, the entry in the text area is required for the app to function properly**

* The User can enter a city name and a country to conduct a search
[Landing Page](./website/imgs/documenation/proper-use-city-country.png)
[Landing Page](./website/imgs/documenation/proper-use-city-country-res.png)


* The User can enter ONLY a city name to conduct a search
[Landing Page](./website/imgs/documenation/proper-use-city-only.png)

* The User can enter a zipcode and a country to conduct a search
[Landing Page](./website/imgs/documenation/proper-use-zipcode-country.png)


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