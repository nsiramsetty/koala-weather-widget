# Koala - Naresh Siramsetty

> Koala Weather Widget

> For Demo , Please visit : https://brave-almeida-185a0f.netlify.app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build --buildno=<number | optional | 1.0.0 Default | Provided by Bamboo or Jenkins>

deploy dist/ as static website (or)
node server.js & (Will serve files from dist at localhost:8080)

# run unit tests
npm run unit
```

## Overview

```
This is a simple weather widget deveoped using Vue JS. 

This application uses OpenWeather, Googgle GeoCoding, Places API to get the data navigator.geolocation to get data related to weather, location, browser settings etc.

On load, this will check & prompt accordingly for permissions. If permissions were blocked , then you will have a screen to select location. If the access is "Ask", Then you will get a prompt for the same and once you allow, it will automatically load the weather for current location.
Note: There seems to  be little bit delay in fetching geocoding & weather for the first time, please give it 2-3 sec to load.

At any point, yo can change the location using settings button on bottom right.

You can navigate between the dates using the arrows in top right.

You can also enable/disable dark mode using the light symbol available on top bar.

I have spent ~6 hrs on the same and would like to concentrate on the below if I could get to spend more time on this.

1. Test Cases
2. Animations
3. UI Color/ Weather Images improvements.

```

## Screenshots - Light

![alt text](https://github.com/nsiramsetty/koala-weather-widget/blob/main/screenshots/dark-tablet-1.png?raw=true)
![alt text](https://github.com/nsiramsetty/koala-weather-widget/blob/main/screenshots/dark-tablet-2.png?raw=true)
![alt text](https://github.com/nsiramsetty/koala-weather-widget/blob/main/screenshots/dark-tablet-3.png?raw=true)

## Screenshots - Dark

![alt text](https://github.com/nsiramsetty/koala-weather-widget/blob/main/screenshots/light-tablet-1.png?raw=true)
![alt text](https://github.com/nsiramsetty/koala-weather-widget/blob/main/screenshots/light-tablet-2.png?raw=true)
![alt text](https://github.com/nsiramsetty/koala-weather-widget/blob/main/screenshots/light-tablet-3.png?raw=true)

## Screenshots - Mobile

![alt text](https://github.com/nsiramsetty/koala-weather-widget/blob/main/screenshots/dark-mobile-4.png?raw=true)
![alt text](https://github.com/nsiramsetty/koala-weather-widget/blob/main/screenshots/light-mobile-4.png?raw=true)
